/** @format */
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import noData from "../../../assets/images/nodata.png";
import RecipesTable from "./RecipesTable";

import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { TostContext } from "../../../Context/ToastContextProvider";

const RecipesList = () => {
  const { getToastValue } = useContext(TostContext);
  const { basUrl, headerAuth, baseImg } = useContext(AuthContext);

  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageArray, setPageArray] = useState([]);

  const [itemId, setItemId] = useState(0);
  const [showRecipes, setShowRecipes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("Closed");
  const [age, setAge] = useState("");

  const [recipesKeys, setRecipesKeys] = useState([
    "name",
    "price",
    "description",
    "tagId",
    "recipeImage",
    "categoriesId",
  ]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getAllCategories = () =>
    setCategoriesList(
      recipesList
        .map((data) => {
          return data?.category[0];
        })
        .filter((element) => {
          return element !== undefined;
        })
    );
  const getAllTags = () =>
    setTags(
      recipesList?.map((data) => {
        return data?.tag;
      })
    );

  const handleClose = () => setShow("Closed");
  const showAddModal = () => {
    getAllTags();
    getAllCategories();
    recipesKeys.map((key) => setValue(key, ""));
    setShow("modal-add");
  };
  const showViewModal = (data) => {
    setShow("modal-view");
    setShowRecipes(data);
  };
  const showUpdateModal = (data) => {
    setShow("modal-update");

    setItemId(data.id);
    // getAllTags();
    // getAllCategories();
    console.log(data.imagePath);
    console.log(data.category[0].id);
    setValue("name", data.name);
    setValue("price", data.price);
    setValue("description", data.description);
    setValue("tagId", data.tag.id);
    setValue("categoriesId", data.category[0].id);
    // setValue("recipeImage", data.imagePath);

    // recipesKeys.map((key) => {
    //   setValue(
    //     key === "tagId"
    //       ? data.tag.id
    //       : data.key
    //       && key === "categoriesId"
    //       ? data.category[0].id
    //       : data.key
    //   );
    // });
  };
  const showDeleteModal = (id) => {
    setItemId(id);
    setShow("modal-delete");
  };

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClick = () => setLoading(true);

  {
    /*Get recipes */
  }

  const getRecipes = (pageNo) => {
    axios
      .get(`${basUrl}Recipe/`, {
        headers: { Authorization: headerAuth },
        params: { pageSize: 5, pageNumber: pageNo },
      })
      .then((response) => {
        setIsLoading(true);
        setPageArray(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setRecipesList(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  {
    /*Post recipes */
  }

  const handlePostRecipes = (data) => {
    const formData = new FormData();

    // for (const property in data) {
    //   formData.append(`${property}`, data[`${property}`]);
    // }
    formData.append("name", data["name"]);
    formData.append("price", data["price"]);
    formData.append("description", data["description"]);
    formData.append("tagId", data["tagId"]);
    formData.append("categoriesIds", data["categoriesIds"]);
    formData.append("recipeImage", data["recipeImage"][0]);
    axios
      .post(`https://upskilling-egypt.com:443/api/v1/Recipe/`, formData, {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((request) => {
        getToastValue("success", request.data.message);
        handleClose();
        getRecipes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateRecipes = (data) => {
    console.log(data["categoriesIds"]);
    const formData = new FormData();
    formData.append("name", data["name"]);
    formData.append("price", data["price"]);
    formData.append("description", data["description"]);
    formData.append("tagId", data["tagId"]);
    formData.append("categoriesIds", data["categoriesIds"]);
    formData.append("recipeImage", data["recipeImage"][0]);
    axios
      .put(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${itemId}`,
        formData,
        {
          headers: {
            Authorization: headerAuth,
          },
        }
      )
      .then((response) => {
        getToastValue("success", "Updated successfully");
        getRecipes();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteRecipes = () => {
    axios
      .delete(`${basUrl}Recipe/${itemId}`, {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((response) => {
        getToastValue("error", "Deleted successfully");
        setIsLoading(true);
        getRecipes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRecipes(1);
    getAllCategories();
    getAllTags();
  }, []);

  return (
    <div className="recipes-list">
      <ToastContainer />
      <div className="d-flex justify-content-between">
        <div>
          <h4>Recipe Table Details</h4>
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
            Add New Item
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
                {categoriesList.map((data, index) => (
                  <MenuItem key={index} value={10}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="add-item ">
        <Modal
          show={show === "modal-add"}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Recipes</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(handlePostRecipes)}>
            <Modal.Body>
              <Row className="g-2 flex-colum">
                <Col md={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      placeholder="Please Enter Recipes name"
                      {...register("name", { required: true })}
                    />
                    {errors.price && errors.name?.type === "required" && (
                      <span className="text-danger">this is required </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      placeholder="Please Enter Recipes Price"
                      type="number"
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    {errors.price && errors.price?.type === "required" && (
                      <span className="text-danger">this is required </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      {...register("description", { required: true })}
                    />
                    {errors.description &&
                      errors.description?.type === "required" && (
                        <span className="text-danger">this is required </span>
                      )}
                  </Form.Group>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Works with selects Tags"
                  >
                    <Form.Select
                      aria-label="Floating label select "
                      {...register("tagId", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    >
                      {tags.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.tagId && errors.tagId?.type === "required" && (
                      <span className="text-danger">this is required </span>
                    )}
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Works with selects"
                  >
                    <Form.Select
                      aria-label="Floating label select Category "
                      {...register("categoriesIds", { valueAsNumber: true })}
                    >
                      {categoriesList.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" {...register("recipeImage")} />
                </Form.Group>
                {/* <Box sx={{ m: 0, width: "300" }} className="mb-x">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    {categoriesList.map((data, index) => (
                      <MenuItem key={index} value={10}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}

                {/* <Box sx={{ m: 0, width: "300" }} className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    {categoriesList.map((data, index) => (
                      <MenuItem key={index} value={10}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <div className="update-item ">
        <Modal
          show={show === "modal-update"}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Recipes</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(handleUpdateRecipes)}>
            <Modal.Body>
              <Row className="g-2 flex-colum">
                <Col md={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      placeholder="Please Enter Recipes name"
                      {...register("name", { required: true })}
                    />
                    {errors.price && errors.name?.type === "required" && (
                      <span className="text-danger">this is required </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      placeholder="Please Enter Recipes Price"
                      type="number"
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    {errors.price && errors.price?.type === "required" && (
                      <span className="text-danger">this is required </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      {...register("description", { required: true })}
                    />
                    {errors.description &&
                      errors.description?.type === "required" && (
                        <span className="text-danger">this is required </span>
                      )}
                  </Form.Group>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Works with selects"
                  >
                    <Form.Select
                      aria-label="Floating label select Tags"
                      {...register("tagId", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    >
                      {tags.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.tagId && errors.tagId?.type === "required" && (
                      <span className="text-danger">this is required </span>
                    )}
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Works with selects"
                  >
                    <Form.Select
                      aria-label="Floating label select Category"
                      {...register("categoriesIds", { valueAsNumber: true })}
                    >
                      {categoriesList.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" {...register("recipeImage")} />
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={handleClose}>
                Save
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
          <Form onSubmit={handleSubmit(handleDeleteRecipes)}>
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
      <div className="view-item">
        <Modal
          show={show === "modal-view"}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Delete Category</Modal.Title> */}
          </Modal.Header>
          <Form onSubmit={handleSubmit(handleDeleteRecipes)}>
            <Modal.Body>
              <div className=" d-flex align-items-center justify-content-center">
                <div style={{ width: "12rem" }} className="m-auto ">
                  <img
                    className="w-100"
                    src={
                      showRecipes?.imagePath
                        ? baseImg + showRecipes?.imagePath
                        : noData
                    }
                    alt="Recipes Category"
                  />
                </div>
                <div className="text-start col-md-6">
                  <p className="fs-5 ">
                    <span className="text-success ">name :</span>
                    {showRecipes?.name}
                  </p>
                  <p className="fs-5 ">
                    <span className="text-success ">price :</span>

                    {showRecipes?.price}
                  </p>
                  <p className="fs-5 ">
                    <span className="text-success ">description :</span>

                    {showRecipes?.description}
                  </p>
                  <p className="fs-5  ">
                    <span className="text-success ">category :</span>

                    {showRecipes?.category[0].name}
                  </p>
                  <p className="fs-5 ">
                    <span className="text-success ">tag :</span>

                    {showRecipes?.tag.name}
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
      <div className="recipes-table my-3">
        {isLoading ? (
          <RecipesTable
            showUpdateModal={showUpdateModal}
            showDeleteModal={showDeleteModal}
            showViewModal={showViewModal}
            recipesList={recipesList}
            baseImg={baseImg}
          />
        ) : (
          <CircularProgress color="success" />
        )}
      </div>
      <div className=" ">
        <nav aria-label="...">
          <ul className="pagination pagination-md  justify-content-center">
            {pageArray.map((page, index) => (
              <li
                onClick={() => getRecipes(page)}
                key={index}
                className={`page-item mx-1 cursor-pointer`}
              >
                <a className="page-link">{page}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default RecipesList;
