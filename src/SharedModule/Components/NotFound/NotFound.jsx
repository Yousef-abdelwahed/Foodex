/** @format */

import React from "react";
import "./NotFound.css";
import { Col, Container, Row, Button } from "react-bootstrap";
import notFound from "../../../assets/images/notFounds/Group 48101676.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notFound-page ">
      <Container className="">
        <Row className=" vh-100  justify-content-center align-items-center">
          <Col md={6} className=" ">
            <h2>Oops</h2>
            <p className="text-success">Page not found </p>
            <p className="text-muted">
              This Page doesn’t exist or was removed! We suggest you back to
              home.
            </p>
            <Button variant="success" onClick={() => navigate("/login")}>
              Back To Home
            </Button>
          </Col>
          <Col md={6} className=" ">
            <img src={notFound} className="w-75 " alt="not found screen " />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
