/** @format */
import { Col, Container, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import logo from "../../../assets/images/authLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Reset/Request", data)
      .then((response) => {
        navigate("/reset-password");
        setTimeout(() => toast(response.data.message), 1000);
      })
      .catch((error) => toast(error.response.data.message));
  };
  return (
    <Container fluid className="auth-container">
      <Row className="bg-overlay vh-100 justify-content-center align-items-center">
        <ToastContainer />
        <Col md={6} className="">
          <div className="form-box p-4 rounded">
            <div className="logo-box text-center p-2">
              <img className="w-50 " src={logo} alt="" />
            </div>

            <h2>Request Reset Password</h2>
            <p className="text-muted ">
              Please Enter Your Email And Check Your Inbox
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
              {errors.email && errors.email?.type === "required" && (
                <span className="text-danger"> Please Enter your Email </span>
              )}
              <div className="d-grid gap-2 pt-2">
                <Button variant="success" type="submit" size="md">
                  <span>Send</span>
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordRequest;
