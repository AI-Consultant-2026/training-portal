import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { Op, Transaction } from "sequelize";
import { config } from "../config";
import { COUNTRIES, CountryCode, isCountryCode } from "../constants/countries";
import * as emails from "../emails";
import { corporateJoinUrl } from "../emails/templates/corporate";
import {
  Course,
  CorporateClient,
  CorporateMember,
  CorporateSeat,
  Enrollment,
  User,
  sequelize,
} from "../models";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { sendVerificationEmail } from "./auth.service";
import { isCorporateCourse } from "./course.service";
import { generateAccessToken, issueRefreshToken } from "./token.service";

// Corporate staff portal (2026-11-10).
//
// Paleon sets up a company at /admin/corporate-clients with the number of seats it paid
// for on each corporate course. Staff open the company's join link
// (/company/join/<joinCode>), create their own login and pick their course(s); each
// course they take uses one seat and is unlocked straight away (payment_confirmed),
// because the company paid Paleon directly. Managers (ticked by Paleon) see seats and
// staff progress at /company, and can invite staff and remove leavers (which frees the
// seat). Seat expiry closes new sign-ups only; people already on a course keep access.

// No 0/o/1/l/i, so a code read out over the phone or typed from a printout still works.
const CODE_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";
const MAX_INVITES_PER_REQUEST = 100;

export function generateJoinCode(length = 10): string {
  const bytes = randomBytes(length);
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

function normaliseDomain(domain: string | null | undefined): string | null {
  const d = domain?.trim().toLowerCase().replace(/^@/, "") ?? "";
  return d || null;
}

function emailMatchesDomain(email: string, domain: string | null): boolean {
  if (!domain) return true;
  const at = email.toLowerCase().split("@")[1] ?? "";
  return at === domain || at.endsWith(`.${domain}`);
}

function isSeatOpen(seat: CorporateSeat, now = new Date()): boolean {
  return !seat.expiresAt || seat.expiresAt > now;
}

// ---------------------------------------------------------------------------
// Seat counting
// ---------------------------------------------------------------------------

// A seat is in use while the enrollment is not suspended (a removed member's enrollment
// is suspended, which frees the seat but keeps their progress if they come back).
async function countUsedSeats(clientId: string, courseId: string, transaction?: Transaction): Promise<number> {
  return Enrollment.count({
    where: { corporateClientId: clientId, courseId, status: { [Op.ne]: "suspended" } },
    transaction,
  });
}

async function usedSeatsByCourse(clientId: string): Promise<Map<string, number>> {
  const rows = (await Enrollment.findAll({
    where: { corporateClientId: clientId, status: { [Op.ne]: "suspended" } },
    attributes: ["courseId"],
    raw: true,
  })) as unknown as { courseId: string }[];
  const used = new Map<string, number>();
  for (const r of rows) used.set(r.courseId, (used.get(r.courseId) ?? 0) + 1);
  return used;
}

async function seatSummaries(client: CorporateClient) {
  const seats = await CorporateSeat.findAll({
    where: { clientId: client.id },
    include: [{ model: Course, as: "course", attributes: ["id", "title", "slug"] }],
    order: [["createdAt", "ASC"]],
  });
  const used = await usedSeatsByCourse(client.id);
  return seats.map((seat) => {
    const course = (seat as unknown as { course: Course }).course;
    const inUse = used.get(seat.courseId) ?? 0;
    return {
      courseId: seat.courseId,
      courseTitle: course?.title ?? "",
      courseSlug: course?.slug ?? "",
      seats: seat.seats,
      used: inUse,
      left: Math.max(0, seat.seats - inUse),
      expiresAt: seat.expiresAt,
      open: isSeatOpen(seat),
    };
  });
}

function serializeClient(client: CorporateClient) {
  return {
    id: client.id,
    name: client.name,
    country: client.country,
    contactName: client.contactName,
    contactEmail: client.contactEmail,
    joinCode: client.joinCode,
    joinUrl: corporateJoinUrl(client.joinCode),
    emailDomain: client.emailDomain,
    status: client.status,
    notes: client.notes,
    createdAt: client.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Admin (Paleon) side
// ---------------------------------------------------------------------------

export interface SeatInput {
  courseId: string;
  seats: number;
  expiresAt?: string | null;
}

export interface ClientInput {
  name: string;
  country?: string;
  contactName?: string | null;
  contactEmail?: string | null;
  emailDomain?: string | null;
  status?: "active" | "suspended";
  notes?: string | null;
  seats?: SeatInput[];
}

export async function listCorporateCourses() {
  const courses = await Course.findAll({ where: { status: "published" }, order: [["createdAt", "ASC"]] });
  return courses.filter(isCorporateCourse).map((c) => ({ id: c.id, title: c.title, slug: c.slug }));
}

export async function listClients() {
  const clients = await CorporateClient.findAll({ order: [["createdAt", "DESC"]] });
  return Promise.all(
    clients.map(async (client) => ({
      ...serializeClient(client),
      seats: await seatSummaries(client),
      memberCount: await CorporateMember.count({ where: { clientId: client.id } }),
    })),
  );
}

async function applySeats(clientId: string, seats: SeatInput[], transaction: Transaction) {
  const corporateIds = new Set((await listCorporateCourses()).map((c) => c.id));
  for (const input of seats) {
    if (!corporateIds.has(input.courseId)) {
      throw ApiError.badRequest("Seats can only be added for the corporate courses");
    }
    const used = await countUsedSeats(clientId, input.courseId, transaction);
    if (input.seats < used) {
      throw ApiError.badRequest(
        `${used} staff already use seats on this course. Remove staff first, or set at least ${used} seats.`,
      );
    }
    const expiresAt = input.expiresAt ? new Date(input.expiresAt) : null;
    const existing = await CorporateSeat.findOne({ where: { clientId, courseId: input.courseId }, transaction });
    if (existing) {
      await existing.update({ seats: input.seats, expiresAt }, { transaction });
    } else if (input.seats > 0) {
      await CorporateSeat.create({ clientId, courseId: input.courseId, seats: input.seats, expiresAt }, { transaction });
    }
  }
}

export async function createClient(input: ClientInput) {
  const client = await sequelize.transaction(async (transaction) => {
    const created = await CorporateClient.create(
      {
        name: input.name.trim(),
        country: input.country && isCountryCode(input.country) ? input.country : "NG",
        contactName: input.contactName?.trim() || null,
        contactEmail: input.contactEmail?.trim().toLowerCase() || null,
        emailDomain: normaliseDomain(input.emailDomain),
        notes: input.notes?.trim() || null,
        joinCode: generateJoinCode(),
      },
      { transaction },
    );
    if (input.seats) await applySeats(created.id, input.seats, transaction);
    return created;
  });
  return getClientDetail(client.id);
}

export async function updateClient(id: string, input: Partial<ClientInput>) {
  const client = await CorporateClient.findByPk(id);
  if (!client) throw ApiError.notFound("Company not found");
  await sequelize.transaction(async (transaction) => {
    await client.update(
      {
        ...(input.name !== undefined ? { name: input.name.trim() } : {}),
        ...(input.country !== undefined && isCountryCode(input.country) ? { country: input.country } : {}),
        ...(input.contactName !== undefined ? { contactName: input.contactName?.trim() || null } : {}),
        ...(input.contactEmail !== undefined
          ? { contactEmail: input.contactEmail?.trim().toLowerCase() || null }
          : {}),
        ...(input.emailDomain !== undefined ? { emailDomain: normaliseDomain(input.emailDomain) } : {}),
        ...(input.status !== undefined ? { status: input.status } : {}),
        ...(input.notes !== undefined ? { notes: input.notes?.trim() || null } : {}),
      },
      { transaction },
    );
    if (input.seats) await applySeats(client.id, input.seats, transaction);
  });
  return getClientDetail(client.id);
}

export async function regenerateJoinCode(id: string) {
  const client = await CorporateClient.findByPk(id);
  if (!client) throw ApiError.notFound("Company not found");
  await client.update({ joinCode: generateJoinCode() });
  return getClientDetail(client.id);
}

export async function deleteClient(id: string): Promise<void> {
  const client = await CorporateClient.findByPk(id);
  if (!client) throw ApiError.notFound("Company not found");
  const inUse = await Enrollment.count({ where: { corporateClientId: id } });
  if (inUse > 0) {
    throw ApiError.conflict(
      "Staff have already started courses with this company's seats. Suspend the company instead of deleting it.",
    );
  }
  await client.destroy();
}

async function membersWithProgress(clientId: string) {
  const members = await CorporateMember.findAll({
    where: { clientId },
    include: [{ model: User, as: "user", attributes: ["id", "email", "firstName", "lastName", "lastActiveAt", "createdAt"] }],
    order: [["createdAt", "ASC"]],
  });
  const userIds = members.map((m) => m.userId);
  const enrollments = userIds.length
    ? await Enrollment.findAll({
        where: { studentId: userIds, corporateClientId: clientId },
        include: [{ model: Course, as: "course", attributes: ["id", "title"] }],
      })
    : [];
  return members.map((m) => {
    const user = (m as unknown as { user: User }).user;
    return {
      userId: m.userId,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      jobTitle: m.jobTitle,
      department: m.department,
      isManager: m.isManager,
      joinedAt: m.createdAt,
      lastActiveAt: user?.lastActiveAt ?? null,
      courses: enrollments
        .filter((e) => e.studentId === m.userId && e.status !== "suspended")
        .map((e) => ({
          enrollmentId: e.id,
          courseId: e.courseId,
          courseTitle: (e as unknown as { course: Course }).course?.title ?? "",
          progressPercent: e.progressPercent,
          status: e.status,
          completedAt: e.completionDate,
        })),
    };
  });
}

export async function getClientDetail(id: string) {
  const client = await CorporateClient.findByPk(id);
  if (!client) throw ApiError.notFound("Company not found");
  return {
    ...serializeClient(client),
    seats: await seatSummaries(client),
    members: await membersWithProgress(client.id),
  };
}

export async function setManager(clientId: string, userId: string, isManager: boolean) {
  const member = await CorporateMember.findOne({ where: { clientId, userId } });
  if (!member) throw ApiError.notFound("Staff member not found");
  await member.update({ isManager });
  return getClientDetail(clientId);
}

// Removing a member suspends their company-paid enrollments (freeing those seats) and
// ends their link to the company. Their account stays, so their own login still works
// and their progress comes back if the same company adds them again.
export async function removeMember(clientId: string, userId: string): Promise<void> {
  const member = await CorporateMember.findOne({ where: { clientId, userId } });
  if (!member) throw ApiError.notFound("Staff member not found");
  await sequelize.transaction(async (transaction) => {
    await Enrollment.update(
      { status: "suspended", paymentConfirmed: false },
      { where: { studentId: userId, corporateClientId: clientId, status: { [Op.ne]: "completed" } }, transaction },
    );
    await member.destroy({ transaction });
  });
}

export async function inviteStaff(clientId: string, emailList: string[], invitedBy?: string | null) {
  const client = await CorporateClient.findByPk(clientId);
  if (!client) throw ApiError.notFound("Company not found");
  if (client.status !== "active") throw ApiError.badRequest("This company's access is suspended");
  const unique = [...new Set(emailList.map((e) => e.trim().toLowerCase()).filter(Boolean))];
  if (unique.length > MAX_INVITES_PER_REQUEST) {
    throw ApiError.badRequest(`Send at most ${MAX_INVITES_PER_REQUEST} invitations at a time`);
  }
  const wrongDomain = unique.filter((e) => !emailMatchesDomain(e, client.emailDomain));
  if (wrongDomain.length) {
    throw ApiError.badRequest(
      `These addresses are not @${client.emailDomain} work emails: ${wrongDomain.slice(0, 5).join(", ")}`,
    );
  }
  const seats = await seatSummaries(client);
  const courseTitles = seats.filter((s) => s.open && s.left > 0).map((s) => s.courseTitle);
  if (courseTitles.length === 0) {
    throw ApiError.badRequest("There are no seats left to invite staff to");
  }
  let sent = 0;
  for (const to of unique) {
    await emails.sendCorporateInviteEmail({ to, companyName: client.name, joinCode: client.joinCode, courseTitles, invitedBy });
    sent += 1;
  }
  return { sent };
}

// ---------------------------------------------------------------------------
// Staff join flow (public link)
// ---------------------------------------------------------------------------

async function findActiveClientByCode(code: string): Promise<CorporateClient> {
  const client = await CorporateClient.findOne({ where: { joinCode: code.trim().toLowerCase() } });
  if (!client) throw ApiError.notFound("This staff sign-up link isn't valid. Ask your manager for the current link.");
  if (client.status !== "active") {
    throw ApiError.forbidden("Your company's access is paused. Please contact your manager or Paleon Training.");
  }
  return client;
}

export async function getJoinInfo(code: string) {
  const client = await findActiveClientByCode(code);
  const seats = await seatSummaries(client);
  return {
    companyName: client.name,
    emailDomain: client.emailDomain,
    courses: seats.map((s) => ({
      courseId: s.courseId,
      title: s.courseTitle,
      seatsLeft: s.left,
      open: s.open && s.left > 0,
    })),
  };
}

// Enrols the user on each chosen course with one of the company's seats. Runs inside the
// caller's transaction, locking each seat row so two staff signing up at the same moment
// cannot both take the last seat.
async function takeSeats(
  client: CorporateClient,
  userId: string,
  courseIds: string[],
  transaction: Transaction,
): Promise<string[]> {
  const enrolledTitles: string[] = [];
  for (const courseId of [...new Set(courseIds)]) {
    const seat = await CorporateSeat.findOne({
      where: { clientId: client.id, courseId },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    if (!seat) throw ApiError.badRequest("Your company hasn't bought seats on that course");
    const course = await Course.findByPk(courseId, { transaction });
    if (!course) throw ApiError.badRequest("Course not found");

    const existing = await Enrollment.findOne({ where: { courseId, studentId: userId }, transaction });
    if (existing && existing.status !== "suspended") {
      // Already on the course (paid personally or via this company): no seat needed.
      if (!existing.paymentConfirmed) {
        // Unpaid self-enrolment: the company seat now pays for it.
        if (!isSeatOpen(seat) || (await countUsedSeats(client.id, courseId, transaction)) >= seat.seats) {
          throw ApiError.conflict(`There are no seats left on ${course.title}. Ask your manager to add more.`);
        }
        await existing.update(
          { paymentConfirmed: true, paymentConfirmedAt: new Date(), corporateClientId: client.id },
          { transaction },
        );
      }
      enrolledTitles.push(course.title);
      continue;
    }

    if (!isSeatOpen(seat)) {
      throw ApiError.conflict(`Sign-ups for ${course.title} have closed. Ask your manager.`);
    }
    if ((await countUsedSeats(client.id, courseId, transaction)) >= seat.seats) {
      throw ApiError.conflict(`There are no seats left on ${course.title}. Ask your manager to add more.`);
    }

    if (existing) {
      await existing.update(
        {
          status: "active",
          paymentConfirmed: true,
          paymentConfirmedAt: new Date(),
          corporateClientId: client.id,
        },
        { transaction },
      );
    } else {
      await Enrollment.create(
        {
          courseId,
          studentId: userId,
          paymentConfirmed: true,
          paymentConfirmedAt: new Date(),
          corporateClientId: client.id,
        },
        { transaction },
      );
    }
    enrolledTitles.push(course.title);
  }
  return enrolledTitles;
}

export interface JoinNewInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  jobTitle?: string | null;
  department?: string | null;
  courseIds: string[];
}

export async function joinWithNewAccount(code: string, input: JoinNewInput) {
  const client = await findActiveClientByCode(code);
  const email = input.email.trim().toLowerCase();
  if (!emailMatchesDomain(email, client.emailDomain)) {
    throw ApiError.badRequest(`Use your @${client.emailDomain} work email address`);
  }
  if (await User.findOne({ where: { email } })) {
    throw ApiError.conflict(
      "You already have a Paleon Training account with this email. Log in, then open your company link again.",
    );
  }
  const passwordHash = await bcrypt.hash(input.password, config.bcryptSaltRounds);
  const country = client.country as CountryCode;

  const { user, titles } = await sequelize.transaction(async (transaction) => {
    const created = await User.create(
      {
        email,
        passwordHash,
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        country,
        location: COUNTRIES[country]?.name ?? "Nigeria",
        // Marks the account as corporate staff, e.g. so learner marketing can leave them out.
        profileData: { corporateClient: client.name },
      },
      { transaction },
    );
    await CorporateMember.create(
      {
        clientId: client.id,
        userId: created.id,
        jobTitle: input.jobTitle?.trim() || null,
        department: input.department?.trim() || null,
      },
      { transaction },
    );
    const enrolled = await takeSeats(client, created.id, input.courseIds, transaction);
    return { user: created, titles: enrolled };
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = await issueRefreshToken(user.id);
  emails
    .sendCorporateWelcomeEmail({ to: user.email, firstName: user.firstName, companyName: client.name, courseTitles: titles })
    .catch((err) => logger.error("Failed to send corporate welcome email", err));
  sendVerificationEmail(user);
  return { user, accessToken, refreshToken };
}

// A logged-in user joining (or adding a course with) their company's link.
export async function joinWithExistingAccount(code: string, userId: string, courseIds: string[]) {
  const client = await findActiveClientByCode(code);
  const user = await User.findByPk(userId);
  if (!user) throw ApiError.notFound("User not found");
  if (user.role !== "student") {
    throw ApiError.badRequest("Staff and admin accounts can't take company seats. Use a learner account.");
  }
  if (!emailMatchesDomain(user.email, client.emailDomain)) {
    throw ApiError.badRequest(
      `Your company asks staff to use their @${client.emailDomain} work email. Log out and create your login with it.`,
    );
  }
  const membership = await CorporateMember.findOne({ where: { userId } });
  if (membership && membership.clientId !== client.id) {
    throw ApiError.conflict("Your account is already linked to another company. Contact Paleon Training.");
  }
  const titles = await sequelize.transaction(async (transaction) => {
    if (!membership) {
      await CorporateMember.create({ clientId: client.id, userId }, { transaction });
      await user.update({ profileData: { ...(user.profileData ?? {}), corporateClient: client.name } }, { transaction });
    }
    return takeSeats(client, userId, courseIds, transaction);
  });
  return { enrolled: titles };
}

// ---------------------------------------------------------------------------
// /company page (staff and managers)
// ---------------------------------------------------------------------------

async function requireMembership(userId: string) {
  const member = await CorporateMember.findOne({ where: { userId } });
  if (!member) throw ApiError.notFound("Your account isn't linked to a company");
  const client = await CorporateClient.findByPk(member.clientId);
  if (!client) throw ApiError.notFound("Your account isn't linked to a company");
  return { member, client };
}

async function requireManager(userId: string) {
  const { member, client } = await requireMembership(userId);
  if (!member.isManager) throw ApiError.forbidden("Only your company's training managers can do this");
  return { member, client };
}

export async function getMyCompany(userId: string) {
  const member = await CorporateMember.findOne({ where: { userId } });
  if (!member) return { company: null };
  const client = await CorporateClient.findByPk(member.clientId);
  if (!client) return { company: null };
  const seats = await seatSummaries(client);
  const mine = await Enrollment.findAll({
    where: { studentId: userId, status: { [Op.ne]: "suspended" } },
    attributes: ["courseId"],
  });
  const myCourseIds = new Set(mine.map((e) => e.courseId));
  const base = {
    name: client.name,
    status: client.status,
    isManager: member.isManager,
    joinCode: client.joinCode,
    // Courses this person can still add with a company seat.
    availableCourses: seats
      .filter((s) => s.open && s.left > 0 && !myCourseIds.has(s.courseId))
      .map((s) => ({ courseId: s.courseId, title: s.courseTitle })),
  };
  if (!member.isManager) return { company: base };
  return {
    company: {
      ...base,
      joinUrl: corporateJoinUrl(client.joinCode),
      emailDomain: client.emailDomain,
      seats,
      members: await membersWithProgress(client.id),
    },
  };
}

export async function managerInvite(userId: string, emailList: string[]) {
  const { client } = await requireManager(userId);
  const manager = await User.findByPk(userId);
  return inviteStaff(client.id, emailList, manager ? `${manager.firstName} ${manager.lastName}` : null);
}

export async function managerRemoveMember(userId: string, memberUserId: string) {
  const { client } = await requireManager(userId);
  if (memberUserId === userId) throw ApiError.badRequest("You can't remove yourself");
  const target = await CorporateMember.findOne({ where: { clientId: client.id, userId: memberUserId } });
  if (!target) throw ApiError.notFound("Staff member not found");
  if (target.isManager) throw ApiError.forbidden("Ask Paleon Training to remove a manager");
  await removeMember(client.id, memberUserId);
}
