/** @format */

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="auth-section">
      <Outlet></Outlet>
    </section>
  );
};

export default AuthLayout;
