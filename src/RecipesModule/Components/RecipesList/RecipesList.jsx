/** @format */
import { useState } from "react";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import RecipesTable from "./RecipesTable";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteModal from "../../DeleteModal";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { useForm } from "react-hook-form";
const RecipesList = () => {
  const { basUrl, headerAuth, baseImg } = useContext(AuthContext);
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tags, setTags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState("Closed");
  const [age, setAge] = useState("");
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => setShow("Closed");
  const showAddModal = () => {
    getAllTags();
    getAllCategories();
    setShow("modal-add");
  };
  const showDeleteModal = (id) => {
    // setItemId(id);
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

  const getCategories = () => {
    axios
      .get(`${basUrl}Recipe/?pageSize=10&pageNumber=1`, {
        headers: { Authorization: headerAuth },
      })
      .then((request) => {
        setRecipesList(request.data.data);
        // setCategoriesList(
        //   recipesList
        //     .map((data) => {
        //       return data?.category[0];
        //     })
        //     .filter((element) => {
        //       return element !== undefined;
        //     })
        // );
        // setTags(
        //   recipesList?.map((data) => {
        //     return data?.tag;
        //   })
        // );
        setIsLoading(true);
      })
      .catch((error) => console.log(error));
  };

  {
    /*Post recipes */
  }
  // const addRecipes = (data) => {
  //   const formData = new FormData();
  //   formData.append("name", data["name"]);
  //   formData.append("price", data["price"]);
  //   formData.append("description", data["description"]);
  //   formData.append("tagId ", data["tagId"]);
  //   formData.append("categoriesIds", data["categoriesIds"]);
  //   formData.append("recipeImage", data["recipeImage"][0]);
  // };
  const handlePostRecipes = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data["name"]);
    formData.append("price", data["price"]);
    formData.append("description", data["description"]);
    formData.append("tagId ", data["tagId"]);
    formData.append("categoriesIds", data["categoriesIds"]);
    // formData.append("recipeImage", data["recipeImage"][0]);
    axios
      .post(`https://upskilling-egypt.com:443/api/v1/Recipe/`, formData, {
        headers: { AUthorization: { headerAuth } },
      })
      .then((request) => {
        console.log(request);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategories();
    getAllCategories();
    getAllTags();
  }, []);

  return (
    <div className="recipes-list">
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
                    label="Works with selects"
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
                      aria-label="Floating label select "
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
                {/* <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" {...register("recipeImage")} />
                </Form.Group> */}
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
              <Button
                variant="success"
                type="submit"
                onClick={handlePostRecipes}
              >
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <div className="delete-item ">
        <DeleteModal
          show={show}
          handleClose={handleClose}
          // handleSubmit={handleSubmit}
        />
      </div>
      <div className="recipes-table my-3">
        {isLoading ? (
          <RecipesTable
            showDeleteModal={showDeleteModal}
            recipesList={recipesList}
            baseImg={baseImg}
          />
        ) : (
          <CircularProgress color="success" />
        )}
      </div>
    </div>
  );
};

export default RecipesList;
