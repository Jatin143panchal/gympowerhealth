import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import AuthLoader from "./AuthLoader";

interface RedirectIfAuthProps {
  children: React.ReactNode;
}

export default function RedirectIfAuth({ children }: RedirectIfAuthProps) {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) return <AuthLoader />;

  // 🔹 Agar user logged-in hai tabhi redirect
  if (user) {
    return (
      <Navigate
        to={isAdmin ? "/admin" : "/dashboard"}
        replace
        state={{ from: location }}
      />
    );
  }

  // 🔹 Public pages (login/signup) freely open
  return <>{children}</>;
}
