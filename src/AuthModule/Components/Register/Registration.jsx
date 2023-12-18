/** @format */
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContextProvider";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import logo from "../../../assets/images/authLogo.png";
import { Button, Col, Form, Row } from "react-bootstrap";
import DynamicInputField from "../../../SharedModule/Components/DynamicInputField/DynamicInputField";
import PasswordInput from "../../../SharedModule/Components/PasswordInput/PasswordInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const Registration = () => {
  const { BaseUrl } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [isLoading, setIsLoading] = useState(false);
  const password = watch("password");

  const registerForm = (data) => {
    const formData = new FormData();

    formData.append("userName", data["userName"]);
    formData.append("country", data["country"]);
    formData.append("email", data["email"]);
    formData.append("phoneNumber", data["phoneNumber"]);
    formData.append("password", data["password"]);
    formData.append("confirmPassword", data["confirmPassword"]);

    console.log(data);
    setIsLoading(true);
    axios
      .post(
        `https://upskilling-egypt.com:443/api/v1/Users/Register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate("/verify-user");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
  };
  return (
    <section id="register" className="auth-container">
      <div className="container-fluid">
        <Row className=" bg-overlay vh-100 justify-content-center align-items-center">
          <Col md={6} className="">
            <div className="form-box p-4 rounded">
              <div className="logo-box text-center p-2">
                <img className="w-50 " src={logo} alt="Logo of brand" />
              </div>
              <h2>Register</h2>
              <p className="text-muted ">
                Welcome Back! Please enter your details{" "}
              </p>
              <Form onSubmit={handleSubmit(registerForm)}>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your userName"
                      {...register("userName", {
                        required: "userName is required",
                      })}
                    />

                    {errors.userName && errors.userName.type === "required" && (
                      <span className="text-danger d-block">
                        name is required
                      </span>
                    )}
                    {errors.userName && errors.userName.type === "pattern" && (
                      <span className="text-danger d-block">
                        Enter a valid userName
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="my-2">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        {...register("email", {
                          required: "email is required",
                        })}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email && errors.email.type == "pattern" && (
                      <span className="text-danger"> enter a valid email </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="my-2">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter your country"
                        id="country"
                        {...register("country", {
                          required: "country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <span className="text-danger">
                        {errors.country.message}{" "}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="my-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter your phoneNumber"
                        id="phoneNumber"
                        {...register("phoneNumber", {
                          required: "phoneNumber is required",
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <span className="text-danger">
                        {" "}
                        {errors.phoneNumber.message}{" "}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="my-2">
                      <input
                        className="form-control"
                        type=""
                        placeholder="Enter your password"
                        id="name"
                        {...register("password", {
                          required: "password is required",
                        })}
                      />
                    </div>
                    {errors.password && (
                      <span className="text-danger">
                        {" "}
                        {errors.password.message}{" "}
                      </span>
                    )}
                    {errors.password && errors.password.type == "pattern" && (
                      <span className="text-danger">
                        enter a valid password
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="my-2">
                      <input
                        className="form-control"
                        type=""
                        placeholder="Enter your confirm Password"
                        // id="confirmPassword"
                        {...register("confirmPassword", {
                          validate: (value) =>
                            value === password || "The passwords do not match",
                        })}
                      />
                    </div>
                    {/* {errors.confirmPassword &&
                      errors.confirmPassword.type == "pattern" && (
                        <span className="text-danger">
                          enter a valid confirmPassword
                        </span>
                      )} */}
                    {errors.confirmPassword && (
                      <span className="text-danger">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                  <div className="text-end courser d-block my-2 ">
                    <Link className="text-green" to={"/login"}>
                      Login Now?
                    </Link>
                  </div>
                  <div className="d-grid gap-2 my-2">
                    <Button variant="success" type="submit" size="md">
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <span className="fw-bold">Register</span>
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Registration;
