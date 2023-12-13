/** @format */

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import UserTable from "./UserTable";
import noData from "../../../assets/images/nodata.png";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { TostContext } from "../../../Context/ToastContextProvider";

const UserLists = () => {
  const { getToastValue } = useContext(TostContext);
  const { basUrl, headerAuth, baseImg } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [pageArray, setPageArray] = useState([]);

  const [show, setShow] = useState("Closed");
  const [showUsers, setShowUsers] = useState();
  const [itemId, setItemId] = useState(0);

  const showViewModal = (data) => {
    setShow("modal-view");
    setShowUsers(data);
    setItemId(data.id);
  };
  const showDeleteModal = (id) => {
    setItemId(id);
    setShow("modal-delete");
  };
  const handleClose = () => setShow("Closed");

  const getUsers = () => {
    axios
      .get(`${basUrl}Users/?pageSize=10&pageNumber=1`, {
        headers: { Authorization: headerAuth },
      })
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

  const handleDeleteUsers = () => {
    axios
      .delete(`${basUrl}Users/${itemId}`, {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((response) => {
        console.log(response);
        getToastValue("success", "Deleted successfully");
        setIsLoading(true);
        getUsers();
      })
      .catch((error) => {
        getToastValue("error", error.message);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="users-list">
      <ToastContainer />

      <div className="d-flex justify-content-between">
        <div>
          <h4>Users Table Details</h4>
          <p>You can check all details</p>
        </div>
      </div>
      <div className="view-item">
        <Modal
          show={show === "modal-view"}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Form onSubmit={handleSubmit(handleDeleteUsers)}>
            <Modal.Body>
              <div className=" d-flex align-items-center justify-content-center">
                <div style={{ width: "12rem" }} className="m-auto ">
                  <img
                    className="w-100"
                    src={
                      showUsers?.imagePath
                        ? baseImg + showUsers?.imagePath
                        : noData
                    }
                    alt="Recipes Category"
                  />
                </div>
                <div className="text-start col-md-6 py-3">
                  <p className="fs-5 ">
                    <span className="text-success ">name :</span>
                    {showUsers?.userName}
                  </p>
                  <p className="fs-5 ">
                    <span className="text-success ">Email :</span>

                    {showUsers?.email}
                  </p>
                  <p className="fs-5 ">
                    <span className="text-success ">Country :</span>

                    {showUsers?.country}
                  </p>
                  <p className="fs-5 ">
                    <span className="text-success ">phone Number :</span>

                    {showUsers?.phoneNumber}
                  </p>
                  <p className="fs-5 ">
                    <span className="text-success ">group name :</span>

                    {showUsers?.group?.name}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-danger"
                type="submit"
                onClick={handleClose}
              >
                Delete This Item
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <div className="delete-item ">
        <Modal
          show={show === "modal-delete"}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Delete Category</Modal.Title> */}
          </Modal.Header>
          <Form onSubmit={handleSubmit(handleDeleteUsers)}>
            <Modal.Body>
              <div className="text-center">
                <img src={noData} alt="Delete Category" />
                <p className="fs-2 fw-bold">Delete This Category</p>
                <p className="text-muted ">
                  are you sure you want to delete this item ? if you are sure
                  just click on delete it
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-danger"
                type="submit"
                onClick={handleClose}
              >
                Delete This Item
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <div className="recipes-table my-3">
        {isLoading ? (
          <>
            {userList.length > 0 ? (
              <>
                <UserTable
                  userList={userList}
                  showDeleteModal={showDeleteModal}
                  showViewModal={showViewModal}
                  baseImg={baseImg}
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

export default UserLists;
