/** @format */

import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import NavCompoenet from "../NavCompoenet/NavCompoenet";
import Header from "../Header/Header";

const MasterLayout = ({ adminData }) => {
  return (
    <Container fluid className="">
      <Row className="flex-direction-row">
        <div className=" ">
          <SideBar />
        </div>
        <div className=" ">
          <NavCompoenet adminData={adminData} />
          <div className=" bg-danger">
            <Header />
          </div>
          <Outlet />
        </div>
      </Row>
    </Container>
  );
};

export default MasterLayout;
