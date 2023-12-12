/** @format */

import { Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useForm } from "react-hook-form";
import logo from "../../../assets/images/authLogo.png";
// import { authLogin } from "../../../UrlModule";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { TostContext } from "../../../Context/ToastContextProvider";
const token = localStorage.getItem("adminToken");

const ChangePassword = ({ show, handleClose, handleLogOut }) => {
  const { getToastValue } = useContext(TostContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .put(
        "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        getToastValue("success", "Update Item Successfully");
        setTimeout(getToastValue("success", "Update Item Successfully"), 2000);
        // handleLogOut();
      }) 
      .catch((error) => getToastValue("error", error.message));
  };
  return (
    <div className="change-password w-100">
      <Modal
        className="d-flex justify-content-center align-items-center"
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Body>
          <Row className=" justify-content-center align-items-center ">
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
                    placeholder="Confirm new password"
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
                  <Button
                    variant="success"
                    type="submit"
                    size="md"
                    // onClick={handleLogOut}
                  >
                    Change Password
                  </Button>
                </div>
              </Form>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChangePassword;
