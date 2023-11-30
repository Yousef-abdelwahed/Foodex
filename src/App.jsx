/** @format */

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import Home from "./HomeModule/Components/Home";
import UserList from "./UsersModule/Components/UserList/UserList";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import CategoryList from "./CategoriesModule/Components/CategoryList/CategoryList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import Login from "./AuthModule/Components/Login/Login";
import ForgetPassword from "./AuthModule/Components/ForgetPassword/ForgetPassword";
import Register from "./AuthModule/Components/Register/Register";
import { useEffect, useState } from "react";
// import ProtectedRoute from "./SharedModule/Components/ProtectedRoute/ProtectedRoute";
import { jwtDecode } from "jwt-decode";
import ResetPasswordRequest from "./AuthModule/Components/ResetPasswordRequest/ResetPasswordRequest";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";

function App() {
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
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: <MasterLayout adminData={adminData} />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <UserList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoryList /> },
      ],
    },
    {
      path: "/",

      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },

        { path: "forget-password", element: <ForgetPassword /> },
        { path: "register", element: <Register /> },
        { path: "reset-password-request", element: <ResetPasswordRequest /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
