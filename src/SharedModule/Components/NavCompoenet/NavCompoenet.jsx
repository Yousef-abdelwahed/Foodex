/** @format */
import logo from "../../../assets/images/2.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const NavCompoenet = (adminData) => {
  return (
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
            {/* // <img= src= width="30"  class="d-inline-block align-top" alt=""> */}
            Bootstrap
          </a>
        </div>
        <span className="px-2">
          <NotificationsIcon fontSize="small" color="#fff" />
        </span>
        <span className="px-2">
          <KeyboardArrowDownIcon fontSize="small" />
        </span>
      </div>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <link className="nav-link" href="#">
            Home <span className="sr-only">(current)</span>
          </link>
        </li>
      </ul>
    </nav>
  );
};

export default NavCompoenet;
