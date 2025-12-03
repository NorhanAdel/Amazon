import React, { useEffect, useState } from "react";
import "./CheckOut.scss";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    governorate: "",
    note: "",
    paymentMethod: "cash",
  });

  const governorates = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Dakahlia",
    "Sharqia",
    "Asyut",
    "Beheira",
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);

    let total = 0;
    storedCart.forEach((item) => {
      total += item.productId?.price || 0;
    });
    setPrice(total);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleReviewOrder = () => {
  if (
    !formData.name ||
    !formData.phone ||
    !formData.address ||
    !formData.governorate
  ) {
    alert("Please fill in all required fields");
    return;
  }

  const orderData = {
    shippingAddress: {
      fullName: formData.name,
      address: formData.address,
      city: formData.governorate,
      phone: formData.phone,
    },
    note: formData.note,
    paymentMethod: formData.paymentMethod,
    totalPrice: price,
    orderItems: cartItems.map((item) => ({
      product: item.productId?._id,
      name: item.productId?.title,
      quantity: item.quantity || 1,
      price: item.productId?.price || 0,
      image: item.productId?.mainImage?.url || "",
    })),
  };

  navigate("/order-summary", { state: orderData });
};



  return (
    <div className="checkout-page">
      <h2>Your Checkout</h2>
      <div className="checkout-container">
        <div className="checkout-left">
          <form>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <select
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
              required
            >
              <option value="">Select Governorate</option>
              {governorates.map((gov, i) => (
                <option key={i} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Note (Optional)"
              name="note"
              value={formData.note}
              onChange={handleChange}
            ></textarea>
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                />
                Credit Card
              </label>
            </div>

            <button type="button" onClick={handleReviewOrder}>
              Review Order
            </button>
          </form>
        </div>

        <div className="checkout-right">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img
                src={item.productId?.images?.[0]}
                alt={item.productId?.title}
              />
              <div>
                <p>{item.productId?.title}</p>
                <p>${item.productId?.price}</p>
              </div>
            </div>
          ))}
          <h3>Total: ${price.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
