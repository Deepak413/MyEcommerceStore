import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin = false }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  console.log("user in ProtectedRoute.js : ", user);
  console.log("isAuthenticated in ProtectedRoute.js : ", isAuthenticated);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user?.user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;