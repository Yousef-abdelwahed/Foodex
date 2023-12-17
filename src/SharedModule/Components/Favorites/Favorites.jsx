/** @format */

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import cardImg from "../../../assets/images/main-bg-img.png";

import { InputAdornment, TextField } from "@mui/material";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";

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
  const { getToastValue } = useContext(TostContext);
  const { basUrl, headerAuth, baseImg, adminData } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getNameValue = (e) => {
    console.log(e);
  };
  const getTagValue = (e) => {
    console.log(e);
  };
  const getCategoryValue = (e) => {
    console.log(e.target.value);
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
  const getFavorites = () => {
    axios
      .get("https://upskilling-egypt.com:443/api/v1/userRecipe/", {
        headers: {
          Authorization: headerAuth,
        },
      })
      .then((response) => {
        setFavoriteList(response?.data.data);
      })
      .catch((error) => console.log(error));
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
      aaa
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            // image={cardImg}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards areddd a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Favorites;
