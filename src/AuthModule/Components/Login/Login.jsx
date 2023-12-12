/** @format */

import { Col, Container, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

import Form from "react-bootstrap/Form";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

import logo from "../../../assets/images/authLogo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import PasswordInput from "../../../SharedModule/Components/PasswordInput/PasswordInput";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

// import PasswordInput from "../../../SharedModule/Components/PasswordInput/PasswordInput";
/** @format */
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import DynamicInputField from "../../../SharedModule/Components/DynamicInputField/DynamicInputField";
import { TostContext } from "../../../Context/ToastContextProvider";

const Login = ({ saveAdminData }) => {
  const { getToastValue } = useContext(TostContext);

  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleLoginForm = (data) => {
    axios
      .post("https://upskilling-egypt.com:443/api/v1/Users/Login", data)
      .then((response) => {
        localStorage.setItem("adminToken", response.data.token);
        saveAdminData();
        navigate("/dashboard");
        getToastValue("success", "Login Successfully");
      })
      .catch((error) => getToastValue("error", error.message));
  };

  return (
    <Container fluid className="auth-container">
      <ToastContainer />
      <Row className="bg-overlay vh-100 justify-content-center align-items-center ">
        <Col md={6} className="">
          <div className="form-box p-4 rounded">
            <div className="logo-box text-center p-2">
              <img className="w-50 " src={logo} alt="" />
            </div>

            <h2>Login</h2>
            <p className="text-muted ">
              Welcome Back! Please enter your details
            </p>
            <Form onSubmit={handleSubmit(handleLoginForm)}>
              <div className="my-2">
                <DynamicInputField
                  type={"email"}
                  register={register}
                  inputType={"email"}
                  placeholder={"Please Enter your Email"}
                />
              </div>
              {errors.email && errors.email.type === "required" && (
                <span className="text-danger">the email is required </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-danger">invalid email </span>
              )}

              <PasswordInput
                register={register}
                placeholder={"Enter you password"}
                value={"password"}
              />
              {errors.password && errors.password?.type === "required" && (
                <span className="text-danger">the password is required </span>
              )}
              <div className="d-flex justify-content-between mb-4 my-2 courser ">
                {/* <Link to={"/register"}>Register Now?</Link> */}
                {"        "}
                <span className=" courser d-block ms-auto">
                  <Link className="text-green " to={"/reset-password-request"}>
                    Forgot Password?
                  </Link>
                </span>
              </div>
              <div className="d-grid gap-2 my-2">
                <Button variant="success" type="submit" size="md">
                  <span>Login</span>
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
