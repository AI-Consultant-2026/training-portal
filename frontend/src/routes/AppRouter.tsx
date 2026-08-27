import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { RoleRoute } from "../components/layout/RoleRoute";
import { Spinner } from "../components/ui/Spinner";
import { lazyImport } from "./lazyImport";

// Every page is lazy-loaded (route-based code splitting): the initial bundle ships the
// app shell (nav, auth bootstrap, router) but not the code for any individual page --
// including admin/instructor-only pages that most visitors never load at all. Suspense
// below shows the same spinner ProtectedRoute already uses while a route's chunk loads.
const AdminCandidatesPage = lazyImport(() => import("../features/admin/AdminCandidatesPage"), "AdminCandidatesPage");
const AdminCapstonesPage = lazyImport(() => import("../features/admin/AdminCapstonesPage"), "AdminCapstonesPage");
const AdminDashboardPage = lazyImport(() => import("../features/admin/AdminDashboardPage"), "AdminDashboardPage");
const AssignmentDetailPage = lazyImport(
  () => import("../features/assignments/AssignmentDetailPage"),
  "AssignmentDetailPage",
);
const GradeSubmissionPage = lazyImport(
  () => import("../features/assignments/GradeSubmissionPage"),
  "GradeSubmissionPage",
);
const InstructorGradingQueuePage = lazyImport(
  () => import("../features/assignments/InstructorGradingQueuePage"),
  "InstructorGradingQueuePage",
);
const ForgotPasswordPage = lazyImport(() => import("../features/auth/ForgotPasswordPage"), "ForgotPasswordPage");
const LoginPage = lazyImport(() => import("../features/auth/LoginPage"), "LoginPage");
const RegisterPage = lazyImport(() => import("../features/auth/RegisterPage"), "RegisterPage");
const ResetPasswordPage = lazyImport(() => import("../features/auth/ResetPasswordPage"), "ResetPasswordPage");
const VerifyEmailPage = lazyImport(() => import("../features/auth/VerifyEmailPage"), "VerifyEmailPage");
const CapstoneDetailPage = lazyImport(() => import("../features/capstones/CapstoneDetailPage"), "CapstoneDetailPage");
const CapstoneGradingQueuePage = lazyImport(
  () => import("../features/capstones/CapstoneGradingQueuePage"),
  "CapstoneGradingQueuePage",
);
const GradeCapstoneSubmissionPage = lazyImport(
  () => import("../features/capstones/GradeCapstoneSubmissionPage"),
  "GradeCapstoneSubmissionPage",
);
const CourseDetailPage = lazyImport(() => import("../features/courses/CourseDetailPage"), "CourseDetailPage");
const CourseListPage = lazyImport(() => import("../features/courses/CourseListPage"), "CourseListPage");
const StudentDashboardPage = lazyImport(
  () => import("../features/dashboard/StudentDashboardPage"),
  "StudentDashboardPage",
);
const LessonDetailPage = lazyImport(() => import("../features/lessons/LessonDetailPage"), "LessonDetailPage");
const BankTransferPage = lazyImport(() => import("../features/payments/BankTransferPage"), "BankTransferPage");
const CardPaymentPage = lazyImport(() => import("../features/payments/CardPaymentPage"), "CardPaymentPage");
const GradeQuizAttemptPage = lazyImport(
  () => import("../features/quizzes/GradeQuizAttemptPage"),
  "GradeQuizAttemptPage",
);
const QuizGradingQueuePage = lazyImport(
  () => import("../features/quizzes/QuizGradingQueuePage"),
  "QuizGradingQueuePage",
);
const QuizResultsPage = lazyImport(() => import("../features/quizzes/QuizResultsPage"), "QuizResultsPage");
const QuizTakingPage = lazyImport(() => import("../features/quizzes/QuizTakingPage"), "QuizTakingPage");
const PartnerPipelinePage = lazyImport(
  () => import("../features/admin/PartnerPipelinePage"),
  "PartnerPipelinePage",
);

function NotFound() {
  return <div className="mx-auto max-w-3xl px-6 py-16 text-center text-gray-600">Page not found.</div>;
}

function RouteFallback() {
  return (
    <div className="flex justify-center py-16">
      <Spinner />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/courses/:slug/pay/card" element={<CardPaymentPage />} />
          <Route path="/courses/:slug/pay/bank-transfer" element={<BankTransferPage />} />
          <Route path="/lessons/:id" element={<LessonDetailPage />} />
          <Route path="/dashboard" element={<StudentDashboardPage />} />
          <Route path="/assignments/:id" element={<AssignmentDetailPage />} />
          <Route path="/capstones/:id" element={<CapstoneDetailPage />} />
          <Route path="/quizzes/:id" element={<QuizTakingPage />} />
          <Route path="/quizzes/:id/attempts" element={<QuizResultsPage />} />
          <Route element={<RoleRoute allowedRoles={["instructor", "admin"]} />}>
            <Route path="/instructor/grading" element={<InstructorGradingQueuePage />} />
            <Route path="/instructor/submissions/:id/grade" element={<GradeSubmissionPage />} />
            <Route path="/instructor/quiz-grading" element={<QuizGradingQueuePage />} />
            <Route
              path="/instructor/quizzes/:quizId/attempts/:attemptId/grade"
              element={<GradeQuizAttemptPage />}
            />
            <Route path="/instructor/capstone-grading" element={<CapstoneGradingQueuePage />} />
            <Route
              path="/instructor/capstone-submissions/:id/grade"
              element={<GradeCapstoneSubmissionPage />}
            />
          </Route>
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/candidates" element={<AdminCandidatesPage />} />
            <Route path="/admin/capstones" element={<AdminCapstonesPage />} />
            <Route path="/admin/partner-pipeline" element={<PartnerPipelinePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
