/** @format */

import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import NavCompoenet from "../NavCompoenet/NavCompoenet";
import Header from "../Header/Header";

const MasterLayout = ({ adminData }) => {
  return (
    <div className="d-flex bg-dark px-0">
      <div>
        <div>
          <SideBar />
        </div>
      </div>
      <div className="w-100 my-3 ">
        <div className="mx-3 ">
          <NavCompoenet />
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
