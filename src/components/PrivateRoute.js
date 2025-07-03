import { Navigate, Outlet } from "react-router-dom";

/**
 * If a JWT is stored in localStorage ➜ render the child routes.
 * Otherwise bounce the user to /login.
 */
export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
