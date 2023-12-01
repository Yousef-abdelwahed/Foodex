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
import { useState } from "react";
// import PasswordInput from "../../../SharedModule/Components/PasswordInput/PasswordInput";

const Login = ({ saveAdminData }) => {
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
      })
      .catch((error) => toast(error.response.data.message));
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
              <InputGroup className="mb-1" size="md">
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faMobileScreenButton} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter your E-mail"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  {...register("email", {
                    required: true,
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />
              </InputGroup>
              {errors.email && errors.email.type === "required" && (
                <span className="text-danger">the email is required </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-danger">invalid email </span>
              )}
              <InputGroup className="my-2" size="md">
                <InputGroup.Text id="basic-addon1">
                  {/* <FontAwesomeIcon icon={faLock} />{" "} */}
                </InputGroup.Text>
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  type="password"
                  aria-describedby="basic-addon1"
                  {...register("password", {
                    required: true,
                    min: 6,
                  })}
                />
              </InputGroup>
              {errors.password && errors.password?.type === "required" && (
                <span className="text-danger">the password is required </span>
              )}
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PasswordInput
                  password={password}
                  handlePassword={(e) => setPassword(e.target.value)}
                  validation={{
                    ...register("password", {
                      required: true,
                      min: 6,
                    }),
                  }}
                />
              </div> */}
              <div className="d-flex justify-content-between mb-4 my-2 courser ">
                <Link to={"/register"}>Register Now?</Link>

                <span className=" courser ">
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
