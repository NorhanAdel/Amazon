const express = require("express");
const router = new express.Router();
const products = require("../model/product");
const user = require("../model/user");
const mongoose = require("mongoose");
const authentication = require("../middleware/authntication");
router.get("/allproducts", async (req, res) => {
  try {
    const productdata = await products.find();
    res.status(201).json(productdata);
    console.log(productdata);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/getproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const SingleProduct = await products.findOne({ id: id });
    if (SingleProduct) {
      res.status(200).json(SingleProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.post("/addcart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userID } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const cart = await products.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!cart) {
      return res.status(404).json({ error: "Product not found" });
    }

    const userContact = await user.findOne({
      _id: new mongoose.Types.ObjectId(userID),
    });
    if (!userContact) {
      return res.status(401).json({ error: "Invalid user" });
    }

    const cartData = await userContact.addDataCart(cart);
    console.log(cartData);
    await userContact.save();

    res
      .status(201)
      .json({ message: "Product added to cart", user: userContact });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/cardproducts", async (req, res) => {
  try {
    const cardProducts = await products.find();

    res.status(200).json(cardProducts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching card products", error: err.message });
  }
});

router.get("/cartdetails", authentication, async (req, res) => {
  try {
    const buyuser = await user
      .findOne({ _id: req.userID })
      .populate("carts.productId");

    if (!buyuser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(buyuser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/uservalite", authentication, async (req, res) => {
  try {
    const userValidate = await user.findOne({ _id: req.userID });
    res.status(200).json(userValidate);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.delete("/remove/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((val) => val.id != id);

    await req.rootUser.save();

    res.status(200).json(req.rootUser);
    console.log("Item removed successfully");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/products/:id/ratings", async (req, res) => {
  console.log("🚀 Fetching ratings for product:", req.params.id);

  try {
    const product = await product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const ratings = product.reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});

    const totalReviews = product.reviews.length;
    const averageRating =
      totalReviews > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        : 0;

    console.log("✅ Ratings fetched:", {
      averageRating,
      totalReviews,
      ratings,
    });

    res.json({
      averageRating: averageRating.toFixed(1),
      totalReviews,
      ratings: Object.keys(ratings).reduce((acc, key) => {
        acc[key] = ((ratings[key] / totalReviews) * 100).toFixed(1);
        return acc;
      }, {}),
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
