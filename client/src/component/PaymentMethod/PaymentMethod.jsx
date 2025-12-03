import { useState } from "react";
import "./PaymentMethod.scss"
const PaymentMethod = () => {
  const [method, setMethod] = useState("credit-card");

  return (
    <div className="payment-method">
      <h2>Payment Method</h2>
      <div>
        <input
          type="radio"
          id="credit-card"
          value="credit-card"
          checked={method === "credit-card"}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="credit-card">Credit Card</label>
      </div>
      <div>
        <input
          type="radio"
          id="paypal"
          value="paypal"
          checked={method === "paypal"}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="paypal">PayPal</label>
      </div>
    </div>
  );
};

export default PaymentMethod;
