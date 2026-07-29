import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
