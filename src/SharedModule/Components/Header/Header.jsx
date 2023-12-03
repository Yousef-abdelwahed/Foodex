/** @format */

import headerImg from "../../../assets/images/header-img.png";
import sectionImg from "../../../assets/images/sectionsHeader.png";

import Banner from "./Banner";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ title, paragraph }) => {
  const location = useLocation();

  return (
    <>
      <div className="header-section d-flex align-items-center  justify-content-between  px-2 bg-primary rounded-3">
        <div className="px-4">
          <h1>
            Welcome <span>{title}!</span>
          </h1>
          <p>{paragraph}</p>
        </div>

        <div className="py-0">
          <img
            className="w-75"
            src={location.pathname == "/dashboard" ? headerImg : sectionImg}
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
