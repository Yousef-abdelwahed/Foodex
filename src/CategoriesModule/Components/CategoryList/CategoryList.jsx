/** @format */
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, ToastContainer } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContextProvider";
import noData from "../../../assets/images/noData.png";
import CategoryTable from "./CategoryTable";
import { toast } from "react-toastify";

const CategoryList = () => {
  const { basUrl, headerAuth } = useContext(AuthContext);
  const [age, setAge] = useState("");
  // const [show, setShow] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isloading, setisLoading] = useState(false);

  const [modalState, setModalState] = useState("Closed");
  const [itemId, setItemId] = useState(0);
  const {
    handleSubmit,
    register,
    formState: { error },
  } = useForm();
  {
    /*Show Modals */
  }
  const showAddModal = () => setModalState("modal-add");
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-delete");
  };
  const showUpdateModal = (data) => {
    console.log(data.id);
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
        toast("Deleted Item Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        handleClose();
        getCategories();
      })
      .catch((error) => console.log(error));
  };
  {
    /*Get category */
  }
  const getCategories = () => {
    axios
      .get(`${basUrl}Category/?pageSize=10&pageNumber=1`, {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((response) => {
        setCategoriesList(response.data.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  {
    /*Update api */
  }
  const handleUpdateCategory = (data) => {
    console.log(data);
    // axios
    //   .put(`${basUrl}Category/${itemId}`, data, {
    //     headers: { Authorization: headerAuth },
    //   })
    //   .then((response) => {
    //     getCategories();
    //     handleClose();
    //     toast("Update Item Successfully", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
      <div className="search-recipes d-flex align-items-center bg-light p-3 rounded-3">
        <div className="w-100 ">
          <TextField
            size="large"
            type="search"
            placeholder="Password"
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
        <div className="check-List">
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
        </div>
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
              <Form.Control placeholder="First name" {...register("name")} />
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
              <Form.Control placeholder="First name" {...register("name")} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={handleClose}>
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
          <Form onSubmit={handleSubmit(handlePostCategory)}>
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
          <CategoryTable
            categoriesList={categoriesList}
            showAddModal={showAddModal}
            showDeleteModal={showDeleteModal}
            showUpdateModal={showUpdateModal}
          />
        ) : (
          <CircularProgress color="success" />
        )}
      </div>
    </div>
  );
};

export default CategoryList;
