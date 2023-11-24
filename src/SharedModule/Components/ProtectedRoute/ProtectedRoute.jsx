/** @format */

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminData }) => {
  const refreshToken = localStorage.getItem("adminToken");
  if (adminData == null && refreshToken == null) {
    return <Navigate to="login" />;
  } else {
    {
      children;
    }
  }
  // const navigate = useNavigate();

  // let auth = { token: refreshToken };
  // return auth.token ? { children } : <Navigate to="login" />;
};

export default ProtectedRoute;
