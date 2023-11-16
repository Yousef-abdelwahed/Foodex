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

function App() {
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "user", element: <UserList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoryList /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "forget-password", element: <ForgetPassword /> },
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
