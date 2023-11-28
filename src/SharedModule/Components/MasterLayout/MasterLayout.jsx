/** @format */

import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import NavCompoenet from "../NavCompoenet/NavCompoenet";
import Header from "../Header/Header";

const MasterLayout = ({ adminData }) => {
  return (
    <Container fluid className="p-0">
      <Row className="ps-0">
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={8}>
          <NavCompoenet adminData={adminData} />
          <Header />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default MasterLayout;
