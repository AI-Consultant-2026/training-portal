import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { RoleRoute } from "../components/layout/RoleRoute";
import { AssignmentDetailPage } from "../features/assignments/AssignmentDetailPage";
import { GradeSubmissionPage } from "../features/assignments/GradeSubmissionPage";
import { InstructorGradingQueuePage } from "../features/assignments/InstructorGradingQueuePage";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { CourseDetailPage } from "../features/courses/CourseDetailPage";
import { CourseListPage } from "../features/courses/CourseListPage";
import { StudentDashboardPage } from "../features/dashboard/StudentDashboardPage";
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
      <Route path="/courses" element={<CourseListPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<StudentDashboardPage />} />
        <Route path="/assignments/:id" element={<AssignmentDetailPage />} />
        <Route path="/quizzes/:id" element={<QuizTakingPage />} />
        <Route path="/quizzes/:id/attempts" element={<QuizResultsPage />} />
        <Route element={<RoleRoute allowedRoles={["instructor", "admin"]} />}>
          <Route path="/instructor/grading" element={<InstructorGradingQueuePage />} />
          <Route path="/instructor/submissions/:id/grade" element={<GradeSubmissionPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
