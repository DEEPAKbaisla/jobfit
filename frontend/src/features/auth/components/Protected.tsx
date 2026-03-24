import Loading from "@/components/loading";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main>
        <Loading/>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
