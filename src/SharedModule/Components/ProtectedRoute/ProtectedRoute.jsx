/** @format */

import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  let { adminData } = useContext(AuthContext);

  const refreshToken = localStorage.getItem("adminToken");
  // if (adminData == null && refreshToken == null) {
  //   return <Navigate to="/login" />;
  // } else {
  //   return children;
  // }
  let auth = { token: refreshToken };
  return adminData == null && auth.token == null ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

export default ProtectedRoute;
