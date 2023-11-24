/** @format */

import { Col, Container, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

import Form from "react-bootstrap/Form";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

import logo from "../../../assets/images/authLogo.png";
import { useForm } from "react-hook-form";
// import { authLogin } from "../../../UrlModule";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const token = localStorage.getItem("adminToken");
const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // console.log(data);
    axios
      .put(
        "http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${token }`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // setTimeout(toast("Wow so easy!"), 2000);
        // saveAdminData();
        navigate("/login");
      })
      .catch((error) => toast(error.response.data.message));
  };

  return (
    <>
      <Container fluid>
        <Row className="bg-overlay vh-100 justify-content-center align-items-center ">
          <ToastContainer />
          <Col md={6}>
            <div className="form-box p-4 rounded">
              <div className="forget-password-box text-center p-2">
                <img className="w-50 " src={logo} alt="" />
              </div>

              <h2>Change your password</h2>
              <p className="text-muted ">Enter your details below</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* old password */}
                <InputGroup className="my-2" size="md">
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />{" "}
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="old Password"
                    aria-label="old Password"
                    type="password"
                    name="oldPassword"
                    aria-describedby="basic-addon1"
                    {...register("oldPassword", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                </InputGroup>
                {errors.oldPassword &&
                  errors.oldPassword?.type === "required" && (
                    <span className="text-danger">
                      the password should be at lest 6 characters
                    </span>
                  )}
                {errors.oldPassword?.type === "minLength" && (
                  <span className="text-danger">invalid old Password </span>
                )}
                {/* new password */}
                <InputGroup className="my-2" size="md">
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />{" "}
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="new Password"
                    aria-label="new Password"
                    type="password"
                    aria-describedby="basic-addon1"
                    {...register("newPassword", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                </InputGroup>
                {errors.newPassword &&
                  errors.newPassword?.type === "required" && (
                    <span className="text-danger">
                      the password should be at lest 6 characters
                    </span>
                  )}
                {errors.newPassword &&
                  errors.newPassword?.type === "minLength" && (
                    <span className="text-danger">invalid password </span>
                  )}
                {/* confirm password */}
                <InputGroup className="my-2" size="md">
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />{" "}
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Password"
                    aria-label="Password"
                    type="password"
                    aria-describedby="basic-addon1"
                    {...register("confirmNewPassword", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                </InputGroup>
                {errors.confirmNewPassword &&
                  errors.confirmNewPassword?.type === "required" && (
                    <span className="text-danger">
                      the confirmed password is required{" "}
                    </span>
                  )}
                {errors.confirmNewPassword &&
                  errors.confirmNewPassword?.type === "minLength" && (
                    <span className="text-danger">
                      the password should be at lest 6 characters
                    </span>
                  )}
                {/* change button */}
                <div className="d-grid gap-2 my-2">
                  <Button variant="success" type="submit" size="md">
                    Change Password
                  </Button>
                </div>
              </Form>
            </div>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgetPassword;
