import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteUser = () => {
  const { isAuthenticated, loading, userOriginal } = useAuth();

  // Valida si esta autenticado
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
};
