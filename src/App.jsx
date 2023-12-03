/** @format */

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import ForgetPassword from "./AuthModule/Components/ForgetPassword/ForgetPassword";
import Login from "./AuthModule/Components/Login/Login";
import Register from "./AuthModule/Components/Register/Register";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import ResetPasswordRequest from "./AuthModule/Components/ResetPasswordRequest/ResetPasswordRequest";
import CategoryList from "./CategoriesModule/Components/CategoryList/CategoryList";
import Home from "./HomeModule/Components/Home";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import UserList from "./UsersModule/Components/UserList/UserList";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContextProvider";

function App() {
  let { adminData, saveAdminData } = useContext(AuthContext);
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
        {
          path: "login",
          element: <Login saveAdminData={saveAdminData} />,
        },

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
