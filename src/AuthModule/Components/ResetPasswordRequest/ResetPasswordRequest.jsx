/** @format */
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import logo from "../../../assets/images/authLogo.png";

import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { TostContext } from "../../../Context/ToastContextProvider";
import DynamicInputField from "../../../SharedModule/Components/DynamicInputField/DynamicInputField";

const ResetPasswordRequest = () => {
  const { basUrl, headerAuth } = useContext(AuthContext);
  const { getToastValue } = useContext(TostContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post(`${basUrl}Users/Reset/Request`, data, {
        headers: { Authorization: headerAuth },
      })
      .then((response) => {
        navigate("/reset-password");
        setTimeout(() => getToastValue("success", response.data.message), 1000);
      })
      .catch((error) => getToastValue("error", error.response.data.message));
  };
  return (
    <Container fluid className="auth-container">
      <Row className="bg-overlay vh-100 justify-content-center ">
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
              <DynamicInputField
                register={register}
                type={"email"}
                placeholder={"Enter your Email"}
              />
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
