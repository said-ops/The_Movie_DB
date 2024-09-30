import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  return user ? children : <Navigate to={"/sign-in"} />;
}

export default ProtectedRoute;
