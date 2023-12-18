/** @format */

import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContextProvider";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import logo from "../../../assets/images/authLogo.png";

const VerifyUser = () => {
  let { BaseUrl } = useContext(AuthContext);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitVerify = (data) => {
    setIsLoading(true);
    axios
      .put(`https://upskilling-egypt.com:443/api/v1/Users/verify`, data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Account verified successfully", {
          autoClose: 2000,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <section id="verify" className="auth-container">
      <div className="container-fluid">
        <Row className=" bg-overlay vh-100 justify-content-center align-items-center">
          <Col md={6} className="">
            <div className="form-box p-4 rounded">
              <div className="logo-box text-center p-2">
                <img className="w-50 " src={logo} alt="Logo of brand" />
              </div>
              <h2>Verify Account</h2>
              <p className="text-muted ">Please Enter Your Verification Code</p>
              <Form onSubmit={handleSubmit(submitVerify)}>
                <div className="my-2">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "email is required",
                    })}
                  />
                </div>
                {errors.email && errors.email.type === "required" && (
                  <span className="text-danger">the email is required </span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-danger">invalid email </span>
                )}

                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your code"
                  {...register("code", {
                    required: "code is required",
                  })}
                />

                {errors.code && errors.code?.type === "required" && (
                  <span className="text-danger">the code is required </span>
                )}

                <div className="d-grid gap-2 my-2">
                  <Button variant="success" type="submit" size="md">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <span className="fw-bold">send</span>
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default VerifyUser;
