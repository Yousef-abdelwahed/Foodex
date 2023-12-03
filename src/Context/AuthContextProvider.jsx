/** @format */
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const basUrl = "https://upskilling-egypt.com:443/api/v1/";
const headerAuth = `Bearer ${localStorage.getItem("adminToken")}`;
const AuthContextProvider = (props) => {
  const [adminData, setAdminData] = useState(null);

  let saveAdminData = () => {
    const token = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(token);
    setAdminData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ adminData, saveAdminData, basUrl, headerAuth }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
