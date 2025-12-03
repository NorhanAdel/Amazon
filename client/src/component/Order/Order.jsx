import React, { useEffect, useState } from "react";
import "./Order.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            {/* -------- Header -------- */}
            <div className="order-header">
              <div className="order-header-item">
                <span className="label">ORDER PLACED</span>
                <span className="value">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="order-header-item">
                <span className="label">TOTAL</span>
                <span className="value">EGP {order.totalPrice}</span>
              </div>

              <div className="order-header-item">
                <span className="label">ORDER ID</span>
                <span className="value">{order._id}</span>
              </div>
            </div>

            {/* -------- Items -------- */}
            <div className="order-items">
              {order.orderItems.map((item, index) => (
                <div className="order-item" key={index}>
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="item-img"
                  />

                  <div className="item-info">
                    <p className="item-title">{item.product.title}</p>

                    <p className="item-qty">Qty: {item.quantity}</p>

                    <p className="item-price">EGP {item.product.price}</p>

                    <button className="buy-again">Buy it again</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
