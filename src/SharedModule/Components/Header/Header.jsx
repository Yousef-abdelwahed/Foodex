/** @format */

import headerImg from "../../../assets/images/header-img.png";
import sectionImg from "../../../assets/images/sectionsHeader.png";

import Banner from "./Banner";
import { useLocation } from "react-router-dom";

const Header = ({ title, paragraph }) => {
  const location = useLocation();
  const { pathname } = location;
  const path = pathname;
  const parts = path.split("/");
  const restOfString = parts.slice(2).join("/");
  return (
    <>
      <div className="header-section d-flex align-items-center bg-success justify-content-between  px-2  rounded-3">
        <div className="px-4">
          {pathname === "/dashboard" ? (
            <h1 className="text-capitalize">
              Welcome <span>{title}!</span>
            </h1>
          ) : (
            <h1 className="text-capitalize">
              {restOfString} <span>item!</span>
            </h1>
          )}
          {pathname === "/dashboard" ? (
            <p>{paragraph}</p>
          ) : (
            <p>
              {" "}
              You can now add your items that any user can order it from the
              Application and you can edit
            </p>
          )}
        </div>

        <div className="py-0">
          <img
            className="w-75"
            src={pathname == "/dashboard" ? headerImg : sectionImg}
          />
        </div>
      </div>
      <div className="banner-container mt-4">
        {location.pathname == "/dashboard" ? <Banner /> : ""}
      </div>
    </>
  );
};

export default Header;
