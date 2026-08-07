import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  const isAdmin = localStorage.getItem("isAdmin");

  if (isAdmin !== "true") {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default AdminProtectedRoute;