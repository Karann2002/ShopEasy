import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/auth/login" />;
  if (Array.isArray(allowedRoles)) {
    if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
  } else {
    if (role !== allowedRoles) return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
