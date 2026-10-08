import { Request, Response } from "express";
import * as zoomAttendeeService from "../services/zoomAttendee.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { website: _honeypot, ...input } = req.body;
  const { attendee, created } = await zoomAttendeeService.recordAttendance(input);
  res.status(created ? 201 : 200).json({ id: attendee.id, alreadyRegistered: !created });
});

export const list = asyncHandler(async (_req: Request, res: Response) => {
  const attendees = await zoomAttendeeService.listAttendees();
  res.json({ attendees });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  if (!(await zoomAttendeeService.deleteAttendee(req.params.id))) {
    throw ApiError.notFound("Attendee not found");
  }
  res.status(204).end();
});
