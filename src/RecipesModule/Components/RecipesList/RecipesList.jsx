/** @format */
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
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
  const { basUrl, headerAuth, baseImg, adminData } = useContext(AuthContext);

  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageArray, setPageArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [itemId, setItemId] = useState(0);
  const [showRecipes, setShowRecipes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState("Closed");

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
  {
    /*Search by */
  }
  const getCategoryValue = (e) => {
    getRecipes(1, null, null, e.target.value);
  };
  const getTagValue = (e) => {
    getRecipes(1, null, e.target.value, null);
  };
  const getAllCategories = () => {
    axios
      .get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=20&pageNumber=1",
        {
          headers: {
            Authorization: headerAuth,
          },
        }
      )
      .then((response) => {
        setCategoriesList(
          response?.data?.data.filter((element) => {
            return element !== undefined;
          })
        );
      })
      .catch((error) => console.log(error));
  };
  const getAllTags = () => {
    axios
      .get("https://upskilling-egypt.com:443/api/v1/tag", {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((response) => {
        setTags(response?.data);
      })
      .catch((error) => console.log(error));
  };

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
    setValue("name", data.name);
    setValue("price", data.price);
    setValue("description", data.description);
    setValue("tagId", data.tag.id);
    setValue("categoriesId", data.category[0].id);
  };
  const showDeleteModal = (id) => {
    setItemId(id);
    setShow("modal-delete");
  };

  const addToFavorite = (id) => {
    setIsLoading(true);

    setItemId(id);
    axios
      .post(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",
        { recipeId: itemId },
        { headers: { Authorization: headerAuth } }
      )
      .then((response) => {
        getToastValue("success", response.data.message);

        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };
  {
    /*Get recipes */
  }

  const getRecipes = (pageNo, name, tagId, categoryId) => {
    setIsLoading(true);

    axios
      .get(`${basUrl}Recipe/`, {
        headers: { Authorization: headerAuth },
        params: { pageSize: 5, pageNumber: pageNo, name, tagId, categoryId },
      })
      .then((response) => {
        getAllTags();
        setIsLoading(false);

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
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateRecipes = (data) => {
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteRecipes = () => {
    setIsLoading(true);
    axios
      .delete(`${basUrl}Recipe/${itemId}`, {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((response) => {
        getToastValue("error", "Deleted successfully");
        setIsLoading(false);
        getRecipes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNameValue = (e) => {
    setSearchValue(e.target.value);
    getRecipes(1, e.target.value);
  };

  useEffect(() => {
    getRecipes(1, "");
    getAllTags();
    getAllCategories();
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
            style={{ width: "12rem" }}
            onClick={showAddModal}
            // endIcon
          >
            {"Add New Recipes"}
          </Button>
        </div>
      </div>
      {/* Check List */}
      <Row className="search-recipes d-flex align-items-center bg-light p-3 rounded-3">
        <Col className=" " md={8}>
          <TextField
            size="large"
            type="search"
            placeholder="Search here"
            onChange={getNameValue}
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
        </Col>
        <Col className="check-List " md={2}>
          <FloatingLabel controlId="floatingSelectGrid" label="Tags">
            <Form.Select
              aria-label="Floating label select "
              onChange={getTagValue}
            >
              <options className="text-muted" value="0">
                Select Tag
              </options>
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
        <Col md={2}>
          <FloatingLabel controlId="floatingSelectGrid" label="Categories">
            <Form.Select
              aria-label="Floating label select"
              // {...register("categoriesIds", { valueAsNumber: true })}
              onChange={getCategoryValue}
            >
              <options className="text-muted" value="0">
                Select Category
              </options>
              {categoriesList.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
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
                    label="Works with selects Categories"
                  >
                    <Form.Select
                      aria-label="Floating label select"
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
        {!isLoading ? (
          <>
            {recipesList.length > 0 ? (
              <>
                <RecipesTable
                  showUpdateModal={showUpdateModal}
                  showDeleteModal={showDeleteModal}
                  showViewModal={showViewModal}
                  recipesList={recipesList}
                  baseImg={baseImg}
                  adminData={adminData}
                  addToFavorite={addToFavorite}
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

export default RecipesList;
