import React, { useEffect } from "react";
import "./BuyNow.scss";
import Slider from "../../component/Slider/Slider";
import HomeDetails from "../../component/HomeDetails/HomeDetails";

import { slideOne, slidetwo } from "../../constant/slideOne";
import { Divider } from "@mui/material";

import Option from "../../component/Option/Option";
import SubTotal from "../../component/SubTotal/SubTotal";
import TotalPrice from "../../component/TotalPrice";

import { useCart } from "../../Context/CartContext";

function BuyNow() {
  const { cart, removeFromCart, fetchCart } = useCart();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (userID) fetchCart(userID);
  }, []);

  
  const getDiscountPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="buynow_page">
      {cart.length > 0 ? (
        <div className="buynow_container">
          <div className="left_buy">
            <h1>Shopping Cart</h1>
            <p className="sel">Select All Items</p>
            <span className="leftPrice">Price</span>
            <Divider />

            {cart.map((item, i) => (
              <React.Fragment key={i}>
                <div className="item_container">
                  <img
                    src={item.productId?.thumbnail || ""}
                    alt={item.productId?.title || "Product Image"}
                  />
                  <div className="item_details">
                    <h3>{item.productId?.title || ""}</h3>
                    <p>{item.productId?.description?.slice(0, 50) || ""}</p>
                    <h3 className="diffrentPric">
                      Discount: {item.productId?.discountPercentage || 0}%
                    </h3>
                    <p className="quantity">Quantity: {item.quantity || 1}</p>
                    <p className="unusuall">Usually dispatch in 8 days.</p>
                    <p>Eligible for FREE Shipping</p>
                    <Option
                      deleteData={item.productId?._id}
                      get={removeFromCart}
                    />
                  </div>
                  <h3 className="price">
                    $
                    {getDiscountPrice(
                      item.productId?.price || 0,
                      item.productId?.discountPercentage || 0
                    )}
                  </h3>
                </div>
                <Divider />
              </React.Fragment>
            ))}

            <TotalPrice item={cart} />
          </div>

          <div className="right_buy">
            <SubTotal item={cart} />
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}

    
      <Slider title="Up to 80% off" />
    </div>
  );
}

export default BuyNow;
