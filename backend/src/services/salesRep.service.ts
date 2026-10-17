import { randomInt } from "crypto";
import { COURSE_PRICES_NGN } from "../constants/coursePricing";
import { REFERRAL_CODE_ALPHABET } from "../constants/referral";
import {
  REP_CODE_BODY_LENGTH,
  REP_CODE_PREFIX,
  REP_COMMISSION_RATE,
  REP_HIGH_COMMISSION_RATE,
  REP_HIGH_RATE_FROM_SALE,
  REP_MONTHLY_BONUS_MIN_SALES,
  REP_MONTHLY_BONUS_NGN,
  REP_TAIL_DAYS,
} from "../constants/salesRep";
import { Course, Enrollment, Referral, SalesRep, SalesRepPayment, SalesRepStudent, User } from "../models";
import type { SalesRepPaymentKind } from "../models/salesRep.model";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { REFUND_WINDOW_DAYS } from "./refund.service";

// Commission sales reps (2026-10-17), matching the Independent Sales Representative
// Agreement. A student who registers with a rep's REP code is tied to that rep for good
// (sales_rep_students). Each course that student pays for in full is a sale, and it
// qualifies once the 7-day refund window has passed without a refund. Commission is worked
// out from those facts every time it's shown, never stored, so a later refund simply drops
// the sale and the balance owed goes down (or negative: money to deduct from the next
// payment). Admins pay reps by bank transfer and record each payment here.

const DAY_MS = 24 * 60 * 60 * 1000;
// Nigeria is UTC+1 all year (no daylight saving), so months are counted in that time.
const LAGOS_OFFSET_MS = 60 * 60 * 1000;

export type RepSaleState =
  | "not_paid"
  | "deposit_only"
  | "refund_window"
  | "qualified"
  | "refunded"
  | "own_account"
  | "after_agreement";

export interface RepSale {
  enrollmentId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  courseFeeNgn: number;
  state: RepSaleState;
  registeredAt: string;
  // When the sale qualifies (or qualified): full payment, but no earlier than 7 days after the first payment.
  qualifiesAt: string | null;
  // Set for qualified sales only.
  month: string | null;
  ratePercent: number | null;
  commissionNgn: number;
}

export interface RepMonth {
  month: string;
  qualifiedSales: number;
  commissionNgn: number;
  bonusNgn: number;
}

export interface RepPaymentView {
  id: string;
  kind: SalesRepPaymentKind;
  amountNgn: number;
  paidOn: string;
  note: string | null;
}

export interface RepView {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  code: string;
  startedAt: string;
  endedAt: string | null;
  notes: string | null;
  active: boolean;
  // Referrals made with an ambassador code under the rep's email (agreement 3.5 forbids it).
  ambassadorReferrals: number;
  counts: { students: number; depositOnly: number; inRefundWindow: number; qualified: number };
  earnedNgn: number;
  paidNgn: number;
  balanceNgn: number;
  // Commission on sales still in the refund window, at the base rate.
  upcomingNgn: number;
  allowancePaidNgn: number;
  otherPaidNgn: number;
}

export interface RepDetail extends RepView {
  sales: RepSale[];
  months: RepMonth[];
  payments: RepPaymentView[];
}

function lagosDateString(d: Date): string {
  return new Date(d.getTime() + LAGOS_OFFSET_MS).toISOString().slice(0, 10);
}

function todayInLagos(now: Date): string {
  return lagosDateString(now);
}

export function isRepActive(rep: Pick<SalesRep, "endedAt">, now = new Date()): boolean {
  return !rep.endedAt || rep.endedAt >= todayInLagos(now);
}

export function normaliseRepCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

/* ------------------------------ the calculation ------------------------------ */

export interface SaleFacts {
  enrollmentId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  courseSlug: string;
  registeredAt: Date;
  enrolledDate: Date;
  paymentConfirmed: boolean;
  paymentConfirmedAt: Date | null;
  depositPaidAt: Date | null;
  refundedAt: Date | null;
}

// Pure: works out every sale's state and commission, and the monthly totals, from the facts.
export function calculateCommission(
  rep: { email: string; endedAt: string | null },
  facts: SaleFacts[],
  now = new Date(),
): { sales: RepSale[]; months: RepMonth[] } {
  // The last moment a sale can qualify: the end of the 30th day after the agreement ends.
  const cutoff = rep.endedAt
    ? new Date(new Date(`${rep.endedAt}T00:00:00Z`).getTime() - LAGOS_OFFSET_MS + (REP_TAIL_DAYS + 1) * DAY_MS)
    : null;

  const sales: RepSale[] = facts.map((f) => {
    const base: RepSale = {
      enrollmentId: f.enrollmentId,
      studentId: f.studentId,
      studentName: f.studentName,
      studentEmail: f.studentEmail,
      courseTitle: f.courseTitle,
      courseFeeNgn: COURSE_PRICES_NGN[f.courseSlug] ?? 0,
      state: "not_paid",
      registeredAt: f.registeredAt.toISOString(),
      qualifiesAt: null,
      month: null,
      ratePercent: null,
      commissionNgn: 0,
    };
    if (f.studentEmail.trim().toLowerCase() === rep.email.trim().toLowerCase()) return { ...base, state: "own_account" };
    if (f.refundedAt) return { ...base, state: "refunded" };
    if (!f.paymentConfirmed) return { ...base, state: f.depositPaidAt ? "deposit_only" : "not_paid" };

    const paidDates = [f.depositPaidAt, f.paymentConfirmedAt].filter((d): d is Date => d != null);
    const firstPaid = paidDates.length ? new Date(Math.min(...paidDates.map((d) => d.getTime()))) : f.enrolledDate;
    const fullyPaid = f.paymentConfirmedAt ?? firstPaid;
    const qualifiesAt = new Date(Math.max(fullyPaid.getTime(), firstPaid.getTime() + REFUND_WINDOW_DAYS * DAY_MS));
    const withDate = { ...base, qualifiesAt: qualifiesAt.toISOString() };

    if (cutoff && qualifiesAt.getTime() >= cutoff.getTime()) return { ...withDate, state: "after_agreement" };
    if (qualifiesAt.getTime() > now.getTime()) return { ...withDate, state: "refund_window" };
    return { ...withDate, state: "qualified", month: lagosDateString(qualifiesAt).slice(0, 7) };
  });

  // Rates depend on each sale's place in its month, so number them in qualifying order.
  const byMonth = new Map<string, RepSale[]>();
  for (const sale of sales) {
    if (sale.state !== "qualified" || !sale.month) continue;
    byMonth.set(sale.month, [...(byMonth.get(sale.month) ?? []), sale]);
  }
  const months: RepMonth[] = [];
  for (const [month, monthSales] of byMonth) {
    monthSales.sort((a, b) => (a.qualifiesAt! < b.qualifiesAt! ? -1 : a.qualifiesAt! > b.qualifiesAt! ? 1 : 0));
    let commissionNgn = 0;
    monthSales.forEach((sale, i) => {
      const rate = i + 1 >= REP_HIGH_RATE_FROM_SALE ? REP_HIGH_COMMISSION_RATE : REP_COMMISSION_RATE;
      sale.ratePercent = rate * 100;
      sale.commissionNgn = Math.round(sale.courseFeeNgn * rate);
      commissionNgn += sale.commissionNgn;
    });
    months.push({
      month,
      qualifiedSales: monthSales.length,
      commissionNgn,
      bonusNgn: monthSales.length >= REP_MONTHLY_BONUS_MIN_SALES ? REP_MONTHLY_BONUS_NGN : 0,
    });
  }
  months.sort((a, b) => (a.month < b.month ? 1 : -1));
  return { sales, months };
}

/* --------------------------------- loading --------------------------------- */

async function loadFacts(repId: string): Promise<{ facts: SaleFacts[]; students: number }> {
  const rows = await SalesRepStudent.findAll({
    where: { salesRepId: repId },
    include: [
      {
        model: User,
        as: "student",
        attributes: ["id", "firstName", "lastName", "email"],
        include: [
          {
            model: Enrollment,
            as: "enrollments",
            include: [{ model: Course, as: "course", attributes: ["title", "slug"] }],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const facts: SaleFacts[] = [];
  for (const row of rows) {
    const student = (row as unknown as { student?: User & { enrollments?: (Enrollment & { course?: Course })[] } })
      .student;
    if (!student) continue;
    for (const e of student.enrollments ?? []) {
      facts.push({
        enrollmentId: e.id,
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`.trim(),
        studentEmail: student.email,
        courseTitle: e.course?.title ?? "Course",
        courseSlug: e.course?.slug ?? "",
        registeredAt: row.createdAt,
        enrolledDate: new Date(e.enrolledDate),
        paymentConfirmed: e.paymentConfirmed,
        paymentConfirmedAt: e.paymentConfirmedAt ? new Date(e.paymentConfirmedAt) : null,
        depositPaidAt: e.depositPaidAt ? new Date(e.depositPaidAt) : null,
        refundedAt: e.refundedAt ? new Date(e.refundedAt) : null,
      });
    }
  }
  return { facts, students: rows.length };
}

async function ambassadorReferralsFor(email: string): Promise<number> {
  const user = await User.findOne({ where: { email: email.trim().toLowerCase() }, attributes: ["id"] });
  if (!user) return 0;
  return Referral.count({ where: { referrerId: user.id } });
}

async function buildDetail(rep: SalesRep, now = new Date()): Promise<RepDetail> {
  const [{ facts, students }, payments, ambassadorReferrals] = await Promise.all([
    loadFacts(rep.id),
    SalesRepPayment.findAll({ where: { salesRepId: rep.id }, order: [["paidOn", "DESC"], ["createdAt", "DESC"]] }),
    ambassadorReferralsFor(rep.email),
  ]);
  const { sales, months } = calculateCommission(rep, facts, now);

  const sum = (kind: SalesRepPaymentKind) =>
    payments.filter((p) => p.kind === kind).reduce((total, p) => total + Number(p.amountNgn), 0);
  const earnedNgn = months.reduce((total, m) => total + m.commissionNgn + m.bonusNgn, 0);
  const paidNgn = sum("commission");

  return {
    id: rep.id,
    name: rep.name,
    email: rep.email,
    phone: rep.phone,
    code: rep.code,
    startedAt: rep.startedAt,
    endedAt: rep.endedAt,
    notes: rep.notes,
    active: isRepActive(rep, now),
    ambassadorReferrals,
    counts: {
      students,
      depositOnly: sales.filter((s) => s.state === "deposit_only").length,
      inRefundWindow: sales.filter((s) => s.state === "refund_window").length,
      qualified: sales.filter((s) => s.state === "qualified").length,
    },
    earnedNgn,
    paidNgn,
    balanceNgn: earnedNgn - paidNgn,
    upcomingNgn: sales
      .filter((s) => s.state === "refund_window")
      .reduce((total, s) => total + Math.round(s.courseFeeNgn * REP_COMMISSION_RATE), 0),
    allowancePaidNgn: sum("allowance"),
    otherPaidNgn: sum("other"),
    sales,
    months,
    payments: payments.map((p) => ({
      id: p.id,
      kind: p.kind,
      amountNgn: Number(p.amountNgn),
      paidOn: p.paidOn,
      note: p.note,
    })),
  };
}

function toView(detail: RepDetail): RepView {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sales: _sales, months: _months, payments: _payments, ...view } = detail;
  return view;
}

/* ------------------------------- registration ------------------------------- */

export async function findActiveRepByCode(rawCode: string): Promise<SalesRep | null> {
  const code = normaliseRepCode(rawCode);
  if (!code.startsWith(REP_CODE_PREFIX)) return null;
  const rep = await SalesRep.findOne({ where: { code } });
  return rep && isRepActive(rep) ? rep : null;
}

// Called (best-effort) from auth.service.register before the ambassador referral. Returns
// true when the code is a rep code, so the caller skips the ambassador lookup.
export async function attachSalesRepOnRegister(studentId: string, rawCode?: string | null): Promise<boolean> {
  if (!rawCode) return false;
  const code = normaliseRepCode(rawCode);
  if (!code.startsWith(REP_CODE_PREFIX)) return false;

  const rep = await findActiveRepByCode(code);
  if (!rep) {
    logger.info(`Sales rep code "${code}" used at registration is unknown or no longer active`);
    return true;
  }
  const existing = await SalesRepStudent.findOne({ where: { studentId } });
  if (!existing) await SalesRepStudent.create({ salesRepId: rep.id, studentId, code });
  return true;
}

/* ----------------------------------- admin ----------------------------------- */

export interface SalesRepInput {
  name: string;
  email: string;
  phone?: string | null;
  startedAt: string;
  endedAt?: string | null;
  notes?: string | null;
}

function toValues(input: SalesRepInput) {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || null,
    startedAt: input.startedAt,
    endedAt: input.endedAt || null,
    notes: input.notes?.trim() || null,
  };
}

async function generateRepCode(): Promise<string> {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    let body = "";
    for (let i = 0; i < REP_CODE_BODY_LENGTH; i += 1) {
      body += REFERRAL_CODE_ALPHABET[randomInt(REFERRAL_CODE_ALPHABET.length)];
    }
    const code = `${REP_CODE_PREFIX}${body}`;
    if (!(await SalesRep.findOne({ where: { code }, attributes: ["id"] }))) return code;
  }
  throw ApiError.badRequest("Could not generate a rep code, please try again");
}

export async function listReps(): Promise<RepView[]> {
  const reps = await SalesRep.findAll({ order: [["createdAt", "ASC"]] });
  const details = await Promise.all(reps.map((rep) => buildDetail(rep)));
  return details.map(toView);
}

export async function getRep(id: string): Promise<RepDetail> {
  const rep = await SalesRep.findByPk(id);
  if (!rep) throw ApiError.notFound("Sales rep not found");
  return buildDetail(rep);
}

export async function createRep(input: SalesRepInput): Promise<RepDetail> {
  const rep = await SalesRep.create({ ...toValues(input), code: await generateRepCode() });
  return buildDetail(rep);
}

export async function updateRep(id: string, input: SalesRepInput): Promise<RepDetail> {
  const rep = await SalesRep.findByPk(id);
  if (!rep) throw ApiError.notFound("Sales rep not found");
  await rep.update(toValues(input));
  return buildDetail(rep);
}

export async function recordPayment(
  id: string,
  input: { kind: SalesRepPaymentKind; amountNgn: number; paidOn: string; note?: string | null },
): Promise<RepDetail> {
  const rep = await SalesRep.findByPk(id);
  if (!rep) throw ApiError.notFound("Sales rep not found");
  await SalesRepPayment.create({
    salesRepId: rep.id,
    kind: input.kind,
    amountNgn: input.amountNgn,
    paidOn: input.paidOn,
    note: input.note?.trim() || null,
  });
  return buildDetail(rep);
}

// For a payment recorded by mistake; the money itself is unaffected.
export async function deletePayment(id: string, paymentId: string): Promise<RepDetail> {
  const rep = await SalesRep.findByPk(id);
  if (!rep) throw ApiError.notFound("Sales rep not found");
  const removed = await SalesRepPayment.destroy({ where: { id: paymentId, salesRepId: rep.id } });
  if (!removed) throw ApiError.notFound("Payment not found");
  return buildDetail(rep);
}
