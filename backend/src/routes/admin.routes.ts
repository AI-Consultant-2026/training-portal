import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import * as emailCampaignsController from "../controllers/emailCampaigns.controller";
import * as referralsController from "../controllers/referrals.controller";
import * as zoomAttendeesController from "../controllers/zoomAttendees.controller";
import * as ambassadorNoticesController from "../controllers/ambassadorNotices.controller";
import * as salesRepsController from "../controllers/salesReps.controller";
import {
  createSalesRepSchema,
  deleteSalesRepPaymentSchema,
  recordSalesRepPaymentSchema,
  salesRepIdSchema,
  updateSalesRepSchema,
} from "../validators/salesReps.validators";
import {
  createNoticeSchema,
  noticeIdSchema,
  updateNoticeSchema,
} from "../validators/ambassadorNotices.validators";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import * as feedbackController from "../controllers/feedback.controller";
import { approveFeedbackSchema } from "../validators/feedback.validators";
import { uploadAttachment } from "../middleware/uploadAttachment";
import { uploadExcel } from "../middleware/uploadExcel";
import { validate } from "../middleware/validate";
import {
  addEnrollmentSchema,
  createCandidateSchema,
  listCoursePaymentsSchema,
  setCapstoneEnabledSchema,
  setPaymentConfirmedSchema,
  setDepositPaidSchema,
  recordRefundSchema,
  setQuizEnabledSchema,
} from "../validators/admin.validators";
import {
  attachmentIdSchema,
  campaignIdSchema,
  removeRecipientSchema,
  sendTestEmailSchema,
  toggleRecipientSchema,
  updateCampaignSchema,
} from "../validators/emailCampaigns.validators";
import { createPartnerSchema, updatePartnerSchema } from "../validators/partners.validators";
import {
  dataPlansSchema,
  issueRewardSchema,
  listReferralsSchema,
  payoutPreviewSchema,
  sendRewardSchema,
  voidReferralSchema,
} from "../validators/referrals.validators";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize("admin"));

adminRouter.get("/stats", adminController.getDashboardStats);
adminRouter.get("/leads", adminController.listLeads);
adminRouter.get("/waitlist", adminController.listWaitlist);
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
adminRouter.get("/course-progress", adminController.getCourseProgress);
adminRouter.get("/zoom-attendees", zoomAttendeesController.list);
adminRouter.delete("/zoom-attendees/:id", zoomAttendeesController.remove);
// Notice board shown to ambassadors at the top of /refer/me.
adminRouter.get("/notices", ambassadorNoticesController.listAll);
adminRouter.post("/notices", validate(createNoticeSchema), ambassadorNoticesController.create);
adminRouter.patch("/notices/:id", validate(updateNoticeSchema), ambassadorNoticesController.update);
adminRouter.delete("/notices/:id", validate(noticeIdSchema), ambassadorNoticesController.remove);

// Commission sales reps: REP codes, their students' sales, commission owed and payments made.
adminRouter.get("/sales-reps", salesRepsController.list);
adminRouter.post("/sales-reps", validate(createSalesRepSchema), salesRepsController.create);
adminRouter.get("/sales-reps/:id", validate(salesRepIdSchema), salesRepsController.get);
adminRouter.patch("/sales-reps/:id", validate(updateSalesRepSchema), salesRepsController.update);
adminRouter.post("/sales-reps/:id/payments", validate(recordSalesRepPaymentSchema), salesRepsController.recordPayment);
adminRouter.delete(
  "/sales-reps/:id/payments/:paymentId",
  validate(deleteSalesRepPaymentSchema),
  salesRepsController.deletePayment,
);
adminRouter.get("/payments/:id/receipt", adminController.downloadPaymentReceipt);
adminRouter.get("/feedback", feedbackController.listForAdmin);
adminRouter.patch("/feedback/:id", validate(approveFeedbackSchema), feedbackController.setApproved);
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
// Instalments: tick the ₦20,000 deposit by hand when the webhook couldn't match it.
adminRouter.patch(
  "/enrollments/:id/deposit",
  validate(setDepositPaidSchema),
  adminController.setDepositPaid,
);
// Cooling-off refunds: records a refund paid back in Paystack and locks the course.
adminRouter.post("/enrollments/:id/refund", validate(recordRefundSchema), adminController.recordRefund);
adminRouter.post("/enrollments/:id/send-completion-email", adminController.sendCompletionEmail);
adminRouter.get("/referrals", validate(listReferralsSchema), referralsController.listReferrals);
adminRouter.post(
  "/referrals/:id/issue-reward",
  validate(issueRewardSchema),
  referralsController.issueReward,
);
adminRouter.post("/referrals/:id/void", validate(voidReferralSchema), referralsController.voidReferral);
adminRouter.get("/referral-payouts/config", referralsController.getPayoutConfig);
adminRouter.get("/referral-payouts/data-plans", validate(dataPlansSchema), referralsController.listDataPlans);
adminRouter.post("/referral-payouts/:id/refresh", referralsController.refreshPayout);
adminRouter.get(
  "/referrals/:id/payout-preview",
  validate(payoutPreviewSchema),
  referralsController.previewPayout,
);
adminRouter.post("/referrals/:id/send-reward", validate(sendRewardSchema), referralsController.sendReward);

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
adminRouter.post(
  "/email-campaigns/:id/attachments",
  validate(campaignIdSchema),
  uploadAttachment,
  emailCampaignsController.addAttachment,
);
adminRouter.delete(
  "/email-campaigns/:id/attachments/:attachmentId",
  validate(attachmentIdSchema),
  emailCampaignsController.removeAttachment,
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
