/** @format */

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./AuthModule/Components/Login/Login";
import Registration from "./AuthModule/Components/Register/Registration";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import ResetPasswordRequest from "./AuthModule/Components/ResetPasswordRequest/ResetPasswordRequest";
import VerifyUser from "./AuthModule/Components/VerifyUser/VerifyUser";
import CategoryList from "./CategoriesModule/Components/CategoryList/CategoryList";
import { AuthContext } from "./Context/AuthContextProvider";
import Home from "./HomeModule/Components/Home";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import Favorites from "./SharedModule/Components/Favorites/Favorites";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import ProtectedRoute from "./SharedModule/Components/ProtectedRoute/ProtectedRoute";
import UserLists from "./UsersModule/Components/UserList/UserLists";

function App() {
  let { adminData, saveAdminData } = useContext(AuthContext);
  const routes = createBrowserRouter([
    {
      path: "/dashboard",

      element: (
        <ProtectedRoute saveAdminData={saveAdminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <UserLists /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoryList /> },
        { path: "favorite", element: <Favorites /> },
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
        { path: "register", element: <Registration /> },
        { path: "reset-password-request", element: <ResetPasswordRequest /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-user", element: <VerifyUser /> },
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
