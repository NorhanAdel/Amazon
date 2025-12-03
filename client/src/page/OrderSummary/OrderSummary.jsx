import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./OrderSummary.scss";

function OrderSummary() {
  const location = useLocation();
  const order = location.state;
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!order || !order.orderItems) return <p>لا يوجد بيانات للطلب</p>;

  const confirmOrder = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(order),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "حدث خطأ أثناء تأكيد الطلب");

      setOrderId(data._id);
      setMessage("تم تأكيد الطلب بنجاح!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      {order.orderItems.map((item, index) => (
        <div key={index} className="item">
          <h4>{item.product.title}</h4>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.product.price} EGP</p>
        </div>
      ))}

      <div className="total">
        <h3>Total: {order.totalPrice} جنيه</h3>
        <p>Payment Method: {order.paymentMethod}</p>
        <p>Shipping Address: {order.shippingAddress?.address}</p>
        <p>Phone: {order.shippingAddress?.phone}</p>
      </div>

      <button onClick={confirmOrder} disabled={loading}>
        {loading ? "جارٍ تأكيد الطلب..." : "تأكيد الطلب"}
      </button>

      {message && <p className="message">{message}</p>}
      {orderId && <p className="order-id">رقم الطلب: {orderId}</p>}
    </div>
  );
}

export default OrderSummary;
