import React from "react";
import { Link } from "react-router-dom";
import { cards } from "../../constant/account";
import "./Account.scss";
 

const Account = () => {
  return (
    <div className="account-container">
      <h1>Your Account</h1>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <Link to={card.link}>
            <div className="account-card" key={index}>
              <img src={card.img} alt="" />
              <div className="content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Account;