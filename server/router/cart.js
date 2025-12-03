const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const User = require("../model/user");
const authentication = require("../middleware/authntication");
 
 
router.get("/getcart/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await User.findById(userID).populate("carts.productId");
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.carts || user.carts.length === 0) {
      return res.status(200).json({ message: "Cart is empty", carts: [] });
    }

    res.status(200).json({
      message: "User cart fetched successfully",
      carts: user.carts,
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});


router.post("/addtocart/:id", async (req, res) => {
  try {
    const { userID } = req.body;
    const productId = req.params.id;

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ error: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await user.addDataCart(product);

    res
      .status(201)
      .json({ message: "Product added to cart", carts: user.carts });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

 
router.delete("/removecart/:id", async (req, res) => {
  try {
    const { userID } = req.body;
    const productId = req.params.id;

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.carts = user.carts.filter((item) => !item.productId.equals(productId));
    await user.save();

    res.json({ message: "Product removed from cart", carts: user.carts });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ error: "Failed to remove from cart" });
  }
});

module.exports = router;
