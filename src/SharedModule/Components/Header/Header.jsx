/** @format */

import headerImg from "../../../assets/images/header-img.svg";
const Header = () => {
  return (
    <div className="header-section d-flex align-items-center  justify-content-between pt-4 px-5 bg-primary rounded-3">
      <div className="">
        <h1>
          Welcome <span>UpSkilling!</span>
        </h1>
        <p>
          This is a welcoming screen for the entry of the application , you can
          now see the options
        </p>
      </div>

      <div className="py-0">
        <img className="w-100" src={headerImg} />
      </div>
    </div>
  );
};

export default Header;
