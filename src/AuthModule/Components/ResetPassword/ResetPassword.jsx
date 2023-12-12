/** @format */
/** @format */

import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import axios from "axios";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TostContext } from "../../../Context/ToastContextProvider";
import DynamicInputField from "../../../SharedModule/Components/DynamicInputField/DynamicInputField";
import PasswordInput from "../../../SharedModule/Components/PasswordInput/PasswordInput";
import logo from "../../../assets/images/authLogo.png";

const ResetPassword = () => {
  const { getToastValue } = useContext(TostContext);

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
        setTimeout(() => getToastValue("success", response.data.message), 500);
      })
      .catch((error) => getToastValue("error", error.response.data.message));
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
              <DynamicInputField
                register={register}
                type={"email"}
                placeholder={"Enter Your Email"}
              >
                <FontAwesomeIcon icon={faMobileScreenButton} />
              </DynamicInputField>
              {/* <InputGroup className="mb-1" size="md">
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
              </InputGroup> */}
              {errors.email && errors.email.type === "required" && (
                <span className="text-danger">the email is required </span>
              )}

              {/* OTP */}
              <DynamicInputField
                register={register}
                inputType={"password"}
                type={"seed"}
                placeholder={"OTP"}
              >
                <HttpsOutlinedIcon fontSize="small" color="action" />
              </DynamicInputField>
              {errors.password && errors.password?.type === "required" && (
                <span className="text-danger">the password is required </span>
              )}
              {/* Password */}
              <PasswordInput
                register={register}
                value={"password"}
                placeholder={"New Password"}
              />

              {errors.password && errors.password?.type === "required" && (
                <span className="text-danger">the password is required </span>
              )}

              {/* Confirm Password */}
              <PasswordInput
                register={register}
                value={"password"}
                placeholder={"confirm Password"}
              />

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
