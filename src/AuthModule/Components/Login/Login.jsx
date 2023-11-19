/** @format */

import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

import Form from "react-bootstrap/Form";
import {
  faLock,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

import logo from "../../../assets/images/authLogo.png";
import { useForm } from "react-hook-form";
// import { authLogin } from "../../../UrlModule";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(" http://localhost:3000/login", data, {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      })
      .then((request) => {
        setTimeout(toast("Wow so easy!"), 2000);
        console.log(request.data);
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
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <FontAwesomeIcon icon={faLock} />{" "}
                </InputGroup.Text>
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  {...register("password", {
                    required: true,
                    min: 6,
                  })}
                />
              </InputGroup>
              {errors.password && errors.password.type === "required" && (
                <span className="text-danger">the password is required </span>
              )}
              {errors.password && errors.password.type === "min" && (
                <span className="text-danger">invalid password </span>
              )}
              <div className="d-flex justify-content-between mb-4 my-2">
                <Link to={"/register"}>Register Now?</Link>

                <span className=" ">
                  <Link className="text-green " to={"/forget-password"}>
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
