import React from "react";
import { navLink } from "../../constant/navLink";
import "./NewNavbar.scss";
import IMG from "../../assets/nav.jpg";
import { Link } from "react-router-dom";
function NewNavbar() {
  return (
    <div className="new_nav">
      <div className="nav_data">
        <div className="left_data">
          {navLink.map((item, i) => {
            return <Link to="/feature">{item}</Link>;
          })}
        </div>
        <div className="right_data">
          <img src={IMG} alt="nav" />
        </div>
      </div>
    </div>
  );
}

export default NewNavbar;
