import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { RoleRoute } from "../components/layout/RoleRoute";
import { AdminCandidatesPage } from "../features/admin/AdminCandidatesPage";
import { AdminDashboardPage } from "../features/admin/AdminDashboardPage";
import { AssignmentDetailPage } from "../features/assignments/AssignmentDetailPage";
import { GradeSubmissionPage } from "../features/assignments/GradeSubmissionPage";
import { InstructorGradingQueuePage } from "../features/assignments/InstructorGradingQueuePage";
import { ForgotPasswordPage } from "../features/auth/ForgotPasswordPage";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { ResetPasswordPage } from "../features/auth/ResetPasswordPage";
import { CapstoneDetailPage } from "../features/capstones/CapstoneDetailPage";
import { CapstoneGradingQueuePage } from "../features/capstones/CapstoneGradingQueuePage";
import { GradeCapstoneSubmissionPage } from "../features/capstones/GradeCapstoneSubmissionPage";
import { CourseDetailPage } from "../features/courses/CourseDetailPage";
import { CourseListPage } from "../features/courses/CourseListPage";
import { StudentDashboardPage } from "../features/dashboard/StudentDashboardPage";
import { LessonDetailPage } from "../features/lessons/LessonDetailPage";
import { BankTransferPage } from "../features/payments/BankTransferPage";
import { CardPaymentPage } from "../features/payments/CardPaymentPage";
import { GradeQuizAttemptPage } from "../features/quizzes/GradeQuizAttemptPage";
import { QuizGradingQueuePage } from "../features/quizzes/QuizGradingQueuePage";
import { QuizResultsPage } from "../features/quizzes/QuizResultsPage";
import { QuizTakingPage } from "../features/quizzes/QuizTakingPage";

function NotFound() {
  return <div className="mx-auto max-w-3xl px-6 py-16 text-center text-gray-600">Page not found.</div>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/courses" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route element={<ProtectedRoute />}>
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
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/candidates" element={<AdminCandidatesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
