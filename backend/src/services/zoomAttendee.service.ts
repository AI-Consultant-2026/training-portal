import { ZoomAttendee } from "../models";

export interface ZoomAttendeeInput {
  name: string;
  email: string;
  dateAttended: string;
  status?: string;
  phone?: string;
  wantsUpdates?: boolean;
}

// Signing in twice for the same session (e.g. from a second device) updates the
// earlier row rather than counting the person twice.
export async function recordAttendance(input: ZoomAttendeeInput): Promise<{ attendee: ZoomAttendee; created: boolean }> {
  const email = input.email.trim().toLowerCase();
  const values = {
    name: input.name.trim(),
    email,
    dateAttended: input.dateAttended,
    status: input.status ?? null,
    phone: input.phone ?? null,
    wantsUpdates: input.wantsUpdates ?? false,
  };
  const existing = await ZoomAttendee.findOne({ where: { email, dateAttended: input.dateAttended } });
  if (existing) {
    // Keep optional answers from the first sign-in unless this one gives new ones.
    await existing.update({
      ...values,
      status: input.status ?? existing.status,
      phone: input.phone ?? existing.phone,
      wantsUpdates: input.wantsUpdates ?? existing.wantsUpdates,
    });
    return { attendee: existing, created: false };
  }
  return { attendee: await ZoomAttendee.create(values), created: true };
}

export async function listAttendees(): Promise<ZoomAttendee[]> {
  return ZoomAttendee.findAll({ order: [["dateAttended", "DESC"], ["createdAt", "DESC"]] });
}

export async function deleteAttendee(id: string): Promise<boolean> {
  return (await ZoomAttendee.destroy({ where: { id } })) > 0;
}
