/** @format */

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
// import style from "./SideBar.module.css";
import { useState } from "react";
import logo from "../../../assets/images/3.png";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import CategoriesIcon from "@mui/icons-material/CalendarMonthOutlined";
import RecipesIcon from "@mui/icons-material/ViewQuilt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "../../../AuthModule/Components/ChangePassword/ChangePassword";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
 
  return (
    <div className="">
      <ChangePassword show={show} handleClose={handleClose} />

      <Sidebar className="vh-100" collapsed={!collapsed}>
        <Menu className="my-4 ">
          <li onClick={() => setCollapsed(!collapsed)}>
            <img style={{ width: " 5.625rem" }} src={logo} alt="brand logo" />
          </li>
          <MenuItem
            className=""
            icon={<HomeIcon fontSize="small" />}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<GroupOutlinedIcon fontSize="small" />}
            component={<Link to="/dashboard/users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<RecipesIcon fontSize="small" />}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
            icon={<CategoriesIcon fontSize="small" />}
            component={<Link to="/dashboard/categories" />}
          >
            Categories
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-lock-open"></i>}
            onClick={handleShow}
            // component={<Link to="/dashboard/change-password"/>}
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={handleLogOut}
            component={<Link to="/login" />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
