import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import * as emailCampaignsController from "../controllers/emailCampaigns.controller";
import * as referralsController from "../controllers/referrals.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { uploadExcel } from "../middleware/uploadExcel";
import { validate } from "../middleware/validate";
import {
  addEnrollmentSchema,
  createCandidateSchema,
  listCoursePaymentsSchema,
  setCapstoneEnabledSchema,
  setPaymentConfirmedSchema,
  setQuizEnabledSchema,
} from "../validators/admin.validators";
import {
  campaignIdSchema,
  removeRecipientSchema,
  sendTestEmailSchema,
  toggleRecipientSchema,
  updateCampaignSchema,
} from "../validators/emailCampaigns.validators";
import { createPartnerSchema, updatePartnerSchema } from "../validators/partners.validators";
import {
  issueRewardSchema,
  listReferralsSchema,
  voidReferralSchema,
} from "../validators/referrals.validators";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize("admin"));

adminRouter.get("/stats", adminController.getDashboardStats);
adminRouter.get("/leads", adminController.listLeads);
adminRouter.delete("/leads/:id", adminController.deleteLead);
adminRouter.get("/partners", adminController.listPartners);
adminRouter.post("/partners", validate(createPartnerSchema), adminController.createPartner);
adminRouter.patch("/partners/:id", validate(updatePartnerSchema), adminController.updatePartner);
adminRouter.delete("/partners/:id", adminController.deletePartner);
adminRouter.get(
  "/courses/:courseId/payments",
  validate(listCoursePaymentsSchema),
  adminController.listCoursePayments,
);
adminRouter.get("/candidates", adminController.listCandidates);
adminRouter.get("/payments/:id/receipt", adminController.downloadPaymentReceipt);
adminRouter.post("/candidates", validate(createCandidateSchema), adminController.createCandidate);
// Must come before "/candidates/:id" -- otherwise Express would match "inactive" as
// the :id param and route this to deactivateCandidate instead.
adminRouter.delete("/candidates/inactive", adminController.deleteInactiveCandidates);
adminRouter.delete("/candidates/:id", adminController.deactivateCandidate);
adminRouter.post(
  "/candidates/:id/enrollments",
  validate(addEnrollmentSchema),
  adminController.addEnrollment,
);
adminRouter.patch(
  "/enrollments/:id/payment",
  validate(setPaymentConfirmedSchema),
  adminController.setPaymentConfirmed,
);
adminRouter.post("/enrollments/:id/send-completion-email", adminController.sendCompletionEmail);
adminRouter.get("/referrals", validate(listReferralsSchema), referralsController.listReferrals);
adminRouter.post(
  "/referrals/:id/issue-reward",
  validate(issueRewardSchema),
  referralsController.issueReward,
);
adminRouter.post("/referrals/:id/void", validate(voidReferralSchema), referralsController.voidReferral);

adminRouter.get("/quizzes", adminController.listQuizzes);
adminRouter.patch(
  "/quizzes/:id",
  validate(setQuizEnabledSchema),
  adminController.setQuizEnabled,
);
adminRouter.get("/capstones", adminController.listCapstones);
adminRouter.patch(
  "/capstones/:id",
  validate(setCapstoneEnabledSchema),
  adminController.setCapstoneEnabled,
);

adminRouter.get("/email-campaigns", emailCampaignsController.listCampaigns);
adminRouter.post(
  "/email-campaigns/upload",
  uploadExcel,
  emailCampaignsController.uploadCampaign,
);
adminRouter.get(
  "/email-campaigns/:id",
  validate(campaignIdSchema),
  emailCampaignsController.getCampaign,
);
adminRouter.patch(
  "/email-campaigns/:id",
  validate(updateCampaignSchema),
  emailCampaignsController.updateCampaign,
);
adminRouter.delete(
  "/email-campaigns/:id",
  validate(campaignIdSchema),
  emailCampaignsController.deleteCampaign,
);
adminRouter.patch(
  "/email-campaigns/:id/recipients/:recipientId",
  validate(toggleRecipientSchema),
  emailCampaignsController.setRecipientSelected,
);
adminRouter.delete(
  "/email-campaigns/:id/recipients/:recipientId",
  validate(removeRecipientSchema),
  emailCampaignsController.removeRecipient,
);
adminRouter.get(
  "/email-campaigns/:id/recipients/:recipientId/preview",
  validate(removeRecipientSchema),
  emailCampaignsController.previewRecipient,
);
adminRouter.post(
  "/email-campaigns/:id/test-email",
  validate(sendTestEmailSchema),
  emailCampaignsController.sendTestEmail,
);
adminRouter.post(
  "/email-campaigns/:id/send",
  validate(campaignIdSchema),
  emailCampaignsController.confirmSend,
);
