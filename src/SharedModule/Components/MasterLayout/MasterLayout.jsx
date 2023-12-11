/** @format */

import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import NavCompoenet from "../NavCompoenet/NavCompoenet";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";

const MasterLayout = ({ adminData }) => {
  return (
    <div className="d-flex  px-0">
      <div
        style={{
          backgroundColor: "#1f263e",
          borderRadius: "0rem 2.625rem 0rem 0rem",
        }}
      >
        <SideBar />
      </div>
      <div className="w-100 my-3 mx-2">
        <div className="mx-3 ">
          <div className="my-3 nav-sec">
            <NavCompoenet adminData={adminData} />
          </div>
          <div className="header-sec">
            <Header
              title={"UpSkilling"}
              paragraph={
                " This is a welcoming screen for the entry of the application , you can    now see the options"
              }
            />
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
