import React from "react";
import { footer_one, footer_two } from "../../constant/footer";
import "./Footer.scss";
import IMG from "../../assets/amazon_PNG25.png";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div
        className="backTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <h1>Back To Top</h1>
      </div>

      <div className="footer_container">
        <div className="footer_deatails_one">
          <h3>Get to know</h3>
          {footer_one.map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
        </div>
        <div className="footer_deatails_one">
          <h3>Connect with Us</h3>
          {footer_two.map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
        </div>
        <div className="footer_deatails_one">
          <h3>Make Money with Us</h3>
          {footer_two.map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
        </div>
        <div className="footer_deatails_one">
          <h3>Make Money with Us</h3>
          {footer_two.map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
        </div>
      </div>
      <div className="lastdetails">
        <img src={IMG} alt="logo" />
        <p>
          Conditions of Use & Sale &nbsp; &nbsp;&nbsp; Privacy Notice &nbsp;
          &nbsp;&nbsp; Interest-Based Ads &nbsp; &nbsp;&nbsp; © 2023-{year},
          Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
}

export default Footer;
