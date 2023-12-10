/** @format */
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../../Context/AuthContextProvider";
import { TostContext } from "../../../Context/ToastContextProvider";
import noData from "../../../assets/images/noData.png";
import CategoryTable from "./CategoryTable";
const CategoryList = () => {
  const { basUrl, headerAuth } = useContext(AuthContext);
  const [age, setAge] = useState("");
  // const [show, setShow] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [pageArray, setPageArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalState, setModalState] = useState("Closed");
  const [itemId, setItemId] = useState(0);
  const { getToastValue } = useContext(TostContext);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  {
    /*Show Modals */
  }
  const showAddModal = () => {
    setValue("name", "");

    setModalState("modal-add");
  };
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-delete");
  };
  const showUpdateModal = (data) => {
    setItemId(data.id);
    setValue("name", data["name"]);

    setModalState("modal-update");
  };

  {
    /*Close Modals */
  }
  const handleClose = () => setModalState("Closed");
  {
    /*Handle API category */
  }

  const handleDeleteCategory = () => {
    axios
      .delete(`${basUrl}Category/${itemId}`, {
        headers: { Authorization: headerAuth },
      })
      .then((response) => {
        getCategories();
        handleClose();
        getToastValue("success", "Deleted category successfully ");
      })
      .catch((error) => getToastValue("error", error.message));
  };
  {
    /*POSt category */
  }

  const handlePostCategory = (data) => {
    axios
      .post(`${basUrl}Category/`, data, {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((response) => {
        getCategories();
        getToastValue("success", "Add category successfully ");
        handleClose();
      })
      .catch((error) => getToastValue("error", error.message));
  };
  {
    /*Get category */
  }
  const getCategories = (pageNo, search) => {
    axios
      .get(`${basUrl}Category/`, {
        headers: {
          Authorization: headerAuth,
        },
        params: { pageSize: 5, pageNumber: pageNo, name: search },
      })
      .then((response) => {
        setLoading(true);
        setCategoriesList(response.data.data);
        setPageArray(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
      })
      .catch((error) => getToastValue("error", error.message));
  };
  {
    /*Update api */
  }
  const handleUpdateCategory = (data) => {
    axios
      .put(`${basUrl}Category/${itemId}`, data, {
        headers: { Authorization: headerAuth },
      })
      .then((response) => {
        getCategories();
        getToastValue("success", "Update Item Successfully");
        handleClose();
        setLoading(true);
      })
      .catch((error) => getToastValue("error", error.message));
  };
  const getNameValue = (e) => {
    setSearchValue(e.target.value);
    getCategories(1, e.target.value);
  };
  useEffect(() => {
    getCategories(1);
  }, []);

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  return (
    <div className="Category-list">
      <ToastContainer />
      <div className="d-flex justify-content-between">
        <div>
          <h4>Categories Table Details</h4>
          <p>You can check all details</p>
        </div>
        <div>
          <Button
            type="submit "
            variant="success"
            size="lg"
            style={{ width: "15rem" }}
            // disabled={show}
            onClick={showAddModal}
          >
            {`Add New Category`}
          </Button>
        </div>
      </div>
      {/* Check List */}
      <div className="search-category d-flex align-items-center bg-light p-3 rounded-3">
        <div className="w-100 ">
          <TextField
            onChange={getNameValue}
            size="large"
            type="search"
            placeholder="Search here ...."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className=" me-2">
                    <SearchIcon fontSize="small" color="action" />
                  </span>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        {/* <div className="check-List">
          <Box sx={{ m: 1, width: 300 }} className="mx-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tag</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ m: 1, width: 300 }} className="mx-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div> */}
      </div>
      {/* add Modal */}
      <div className="add-item ">
        <Modal
          show={modalState === "modal-add"}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(handlePostCategory)}>
            <Modal.Body>
              <Form.Control
                placeholder="Please Enter category name"
                {...register("name", { required: true })}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      {/* Update  Modal */}

      <div className="update-item ">
        <Modal
          show={modalState === "modal-update"}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Category</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(handleUpdateCategory)}>
            <Modal.Body>
              <Form.Control
                type="text"
                placeholder="Enter Category name"
                {...register("name", { required: true })}
              />
              {errors.name && errors.name?.type === "required" && (
                <span className="text-danger">this is required </span>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      {/* Delete Modal */}
      <div className="delete-item ">
        <Modal
          show={modalState === "modal-delete"}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Delete Category</Modal.Title> */}
          </Modal.Header>
          <Form onSubmit={handleSubmit(handleDeleteCategory)}>
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
                onClick={handleDeleteCategory}
              >
                Delete This Item
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <div className="recipes-table my-3">
        {loading ? (
          <>
            {categoriesList.length > 0 ? (
              <>
                <CategoryTable
                  categoriesList={categoriesList}
                  showDeleteModal={showDeleteModal}
                  showUpdateModal={showUpdateModal}
                />
                <div className="my-3">
                  <nav aria-label="...">
                    <ul className="pagination pagination-md justify-content-center">
                      {pageArray.map((page, index) => (
                        <li
                          onClick={() => getCategories(page, searchValue)}
                          key={index}
                          className={`page-item mx-1 cursor-pointer `}
                        >
                          <a className="page-link cursor-pointer">{page}</a>
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

export default CategoryList;
