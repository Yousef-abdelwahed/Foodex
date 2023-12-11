/** @format */

import { useContext, useEffect, useState } from "react";
import RecipesList from "../../../RecipesModule/Components/RecipesList/RecipesList";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContextProvider";

const UserList = () => {
  const { headerAuth } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);

  const getUsers = () => {
    axios
      .get("https://upskilling-egypt.com:443/api/v1/userRecipe/", {
        headers: { Authorization: headerAuth },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUsers();
  }, []);
  return <></>;
};

export default UserList;
