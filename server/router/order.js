const express = require("express");
const router = express.Router();
const Order = require("../model/order");
const authentication = require("../middleware/authntication");

router.get("/orders", authentication, async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.userID }).populate(
      "orderItems.product"
    );
    res.status(200).json({ orders: userOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/create-order", authentication, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || !shippingAddress || !paymentMethod || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      user: req.userID,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.error(err);
  }
});

module.exports = router;
