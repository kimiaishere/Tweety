import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  return children;
}