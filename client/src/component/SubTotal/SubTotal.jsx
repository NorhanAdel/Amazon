import React, { useState, useEffect } from "react";
import "./SubTotal.scss";
import { useNavigate } from "react-router-dom";

function SubTotal({ item }) {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    item.forEach((items) => {
      total += items.productId?.price || 0;
    });
    setPrice(total);
  }, [item]);

  const handleNavigate = () => {
    
    localStorage.setItem("cartItems", JSON.stringify(item));
    navigate("/checkout");
  };

  return (
    <div className="subtotal">
      <div className="cost_right">
        <p
          style={{
            color: "rgb(13, 124, 124)",
            fontWeight: 500,
            fontSize: "12px",
          }}
        >
          Your order is eligible for FREE Delivery
        </p>
        <span style={{ color: "#565959", fontWeight: 400 }}>
          Select this option at checkout. Details
        </span>
        <h3 style={{ fontWeight: 500 }}>
          Subtotal ({item.length} item):{" "}
          <span style={{ fontWeight: 700, color: "#111" }}>
            ${price.toFixed(2)}
          </span>
        </h3>
        <button className="buy_process" onClick={handleNavigate}>
          Process to Buy
        </button>
        <div className="emi">Emi available</div>
      </div>
    </div>
  );
}

export default SubTotal;
