/** @format */

import React from "react";
import headerImg from "../../../assets/images/header-img.svg";
const Header = () => {
  return (
    <div className="header-section my-2">
      <div>
        <h1>
          Welcome <span className="">Upskilling!</span>
        </h1>
        <p className="text-wrap">
          This is a welcoming screen for the entry of the application , you can
          now see the options
        </p>
      </div>
      <div className="img-header ms-auto">
        <img src={headerImg} alt="Welcome image" />
      </div>
    </div>
  );
};

export default Header;
