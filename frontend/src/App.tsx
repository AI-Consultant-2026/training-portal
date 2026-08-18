import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";
import { EmailVerificationBanner } from "./components/layout/EmailVerificationBanner";
import { useAppDispatch } from "./app/hooks";
import { bootstrapAuth } from "./features/auth/authSlice";
import { AppRouter } from "./routes/AppRouter";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <EmailVerificationBanner />
          <AppRouter />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
