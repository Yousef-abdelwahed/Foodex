/** @format */

import { CardActionArea, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { TostContext } from "../../../Context/ToastContextProvider";
const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [tags, setTags] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { getToastValue } = useContext(TostContext);
  const { basUrl, headerAuth, baseImg, adminData } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getNameValue = (e) => {
    setSearchValue(e.target.value);
    getFavorites(1, e.target.value);
  };
  const getTagValue = (e) => {
    getFavorites(1, null, e.target.value, null);
  };
  const getCategoryValue = (e) => {
    getFavorites(1, null, null, e.target.value);
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
  const getFavorites = (pageNo, name, tagId, categoryId) => {
    setIsLoading(true);

    axios
      .get("https://upskilling-egypt.com:443/api/v1/userRecipe/", {
        headers: {
          Authorization: headerAuth,
        },
        params: { pageSize: 5, pageNumber: pageNo, name, tagId, categoryId },
      })
      .then((response) => {
        console.log(response?.data.data);
        setFavoriteList(response?.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`${basUrl}userRecipe/${id}`, {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((response) => {
        getToastValue("error", "Deleted successfully");
        setIsLoading(false);
        getFavorites();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getFavorites();
    getAllTags();
    getAllCategories();
  }, []);
  return (
    <div className="favor-list">
      <ToastContainer />
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
      <Row className=" justify-content-start align-items-center">
        {isLoading ? (
          <div>
            <CircularProgress color="success" />
          </div>
        ) : (
          favoriteList.map((favorite) => (
            <Card
              className="my-3 mx-3"
              key={favorite.id}
              sx={{ maxWidth: 345 }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={baseImg + favorite?.recipe?.imagePath}
                  alt="favorite items images"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {favorite?.recipe?.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Price:
                    {favorite?.recipe?.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* Lizards areddd a widespread group of squamate reptiles, with
                over 6,000 species, ranging across all continents except
                Antarctica */}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon sx={{ color: pink[500] }} />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(favorite.id)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Card>
          ))
        )}
      </Row>
    </div>
  );
};

export default Favorites;
