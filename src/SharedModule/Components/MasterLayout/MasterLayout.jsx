/** @format */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";

const MasterLayout = ({ adminData }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10}>
          <NavBar adminData={adminData} />
          <Header />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default MasterLayout;
