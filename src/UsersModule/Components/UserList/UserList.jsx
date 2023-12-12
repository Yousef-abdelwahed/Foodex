/** @format */

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { Button } from "react-bootstrap";
import UserTable from "./UserTable";
import noData from "../../../assets/images/nodata.png";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { headerAuth, basUrl } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [pageArray, setPageArray] = useState([]);

  const getUsers = () => {
    axios
      .get(
        `http://upskilling-egypt.com:3003/api/v1/Users/?pageSize=10&pageNumber=1`,
        {
          headers: { Authorization: headerAuth },
        }
      )
      .then((response) => {
        setUserList(response.data.data);
        setIsLoading(true);
        setPageArray(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="users-list">
      <div className="d-flex justify-content-between">
        <div>
          <h4>Users Table Details</h4>
          <p>You can check all details</p>
        </div>
      </div>
      <div className="recipes-table my-3">
        {isLoading ? (
          <>
            {userList.length > 0 ? (
              <>
                <UserTable
                  values={{ userList }}
                  // showUpdateModal={showUpdateModal}
                  // showDeleteModal={showDeleteModal}
                  // showViewModal={showViewModal}
                  // recipesList={recipesList}
                  // baseImg={baseImg}
                />
                <div className=" my-3">
                  <nav aria-label="...">
                    <ul className="pagination pagination-md  justify-content-center">
                      {pageArray.map((page, index) => (
                        <li
                          onClick={() => getRecipes(page, searchValue)}
                          key={index}
                          className={`page-item mx-1 cursor-pointer`}
                        >
                          <a className="page-link">{page}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </>
            ) : (
              <div className="text-center">
                <img src={noData} />
                <p className="fw-bold fs-4">No Data</p>
              </div>
            )}
          </>
        ) : (
          <CircularProgress color="success" />
        )}
      </div>
    </div>
  );
};

export default UserList;
