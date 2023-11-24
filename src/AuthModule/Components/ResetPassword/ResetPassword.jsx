/** @format */
/** @format */

import { Col, Container, Row } from "react-bootstrap";
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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Reset", data)
      .then((response) => {
        navigate("/login");
        setTimeout(() => toast(response.data.message), 500);
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

            <h2>Reset Password</h2>
            <p className="text-muted ">
              Please Enter Your Otp or Check Your Inbox
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
                  })}
                />
              </InputGroup>
              {errors.email && errors.email.type === "required" && (
                <span className="text-danger">the email is required </span>
              )}

              {/* OTP */}
              <InputGroup className="my-2" size="md">
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faLock} />{" "}
                </InputGroup.Text>
                <Form.Control
                  placeholder="OTP"
                  aria-label="OTP"
                  type="password"
                  aria-describedby="basic-addon1"
                  {...register("seed", {
                    required: true,
                    min: 6,
                  })}
                />
              </InputGroup>
              {errors.password && errors.password?.type === "required" && (
                <span className="text-danger">the password is required </span>
              )}
              {/* Password */}
              <InputGroup className="my-2" size="md">
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faLock} />{" "}
                </InputGroup.Text>
                <Form.Control
                  placeholder="New Password"
                  aria-label="password"
                  type="password"
                  aria-describedby="basic-addon1"
                  {...register("password", {
                    required: true,
                  })}
                />
              </InputGroup>
              {errors.password && errors.password?.type === "required" && (
                <span className="text-danger">the password is required </span>
              )}

              {/* Confirm Password */}
              <InputGroup className="my-2" size="md">
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="confirm Password"
                  aria-label="confirm Password"
                  type="password"
                  aria-describedby="basic-addon1"
                  {...register("confirmPassword", {
                    required: true,
                  })}
                />
              </InputGroup>
              {errors.confirmPassword &&
                errors.confirmPassword?.type === "required" && (
                  <span className="text-danger">
                    the confirm Password is required{" "}
                  </span>
                )}

              {/* ************************************** */}
              <div className="d-grid gap-2 my-2">
                <Button variant="success" type="submit" size="md">
                  <span>Reset Password</span>
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
