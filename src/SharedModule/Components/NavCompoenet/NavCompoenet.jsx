/** @format */
import logo from "../../../assets/images/2.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

const NavCompoenet = (adminData) => {
  return (
    <>
      {/* <div className="bg-light rounded-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-1 p-3">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto">
              <a className="navbar-brand" href="#">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt=""
                />
                Bootstrap
              </a>
            </div>
            <span className="px-2">
              <KeyboardArrowDownIcon fontSize="small" />
            </span>
            <span className="px-2">
              <NotificationsIcon fontSize="small" color="#fff" />
            </span>
          </div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div> */}

      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            {" "}
            <Image src={logo} roundedCircle />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavCompoenet;
