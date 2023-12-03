/** @format */
import logo from "../../../assets/images/8c008bab0c67b666a9ccda1c84f11215.png";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";

const NavCompoenet = (adminData) => {
  let data = adminData;
  return (
    <>
      <Navbar className="bg-body-tertiary py-2 rounded-3">
        <Container className="">
          <Form.Control
            type="text"
            placeholder="Search Here"
            className=" mr-sm-2 mx-3 rounded-pill"
          />
          <Navbar.Toggle />
          <Navbar.Collapse className="">
            <div className="ms-auto ">
              <Navbar.Brand href="#home" className="me-2 ">
                <img
                  src={logo}
                  width="60"
                  height="60"
                  className="d-inline-block align-top user-pic rounded-circle p-3"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
            </div>
            <Navbar.Text>{data?.adminData?.userName}</Navbar.Text>
            <div className="mx-3">
              <NavDropdown title={" "} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              {/* <KeyboardArrowDownIcon fontSize="small" /> */}
            </div>
            <div className="mx-3">
              <NotificationsIcon fontSize="small" />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavCompoenet;
