import path from "path";
import { Request, Response } from "express";
import * as capstoneService from "../services/capstone.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { storageAdapter } from "../utils/storage";

export const getByCourse = asyncHandler(async (req: Request, res: Response) => {
  const capstone = await capstoneService.getByCourse(req.params.id);
  res.json({ capstone });
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const capstone = await capstoneService.getById(req.params.id);
  res.json({ capstone });
});

export const submit = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file
    ? { buffer: req.file.buffer, originalname: req.file.originalname, mimetype: req.file.mimetype }
    : undefined;

  const submission = await capstoneService.submit(req.params.id, req.user!.id, {
    submissionText: req.body.submissionText,
    file,
  });
  res.status(201).json({ submission });
});

export const getMySubmission = asyncHandler(async (req: Request, res: Response) => {
  const submission = await capstoneService.getMySubmission(req.params.id, req.user!.id);
  res.json({ submission });
});

export const getSubmission = asyncHandler(async (req: Request, res: Response) => {
  const submission = await capstoneService.getSubmission(
    req.params.id,
    req.params.submissionId,
    req.user!,
  );
  res.json({ submission });
});

export const listSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const submissions = await capstoneService.listSubmissions(req.params.id, req.user!);
  res.json({ submissions });
});

export const listUngradedForInstructor = asyncHandler(async (req: Request, res: Response) => {
  const submissions = await capstoneService.listUngradedForInstructor(req.user!);
  res.json({ submissions });
});

export const downloadFile = asyncHandler(async (req: Request, res: Response) => {
  const submission = await capstoneService.getSubmissionFileForDownload(req.params.id, req.user!);
  const stream = storageAdapter.getReadStream(submission.filePath!);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${path.basename(submission.filePath!)}"`,
  );
  stream.on("error", () => {
    res.status(404).json({ error: { message: "File not found" } });
  });
  stream.pipe(res);
});

export const grade = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw ApiError.badRequest("Submission id is required");
  }
  const submission = await capstoneService.grade(req.params.id, req.user!, {
    score: req.body.score,
    feedback: req.body.feedback,
  });
  res.json({ submission });
});
