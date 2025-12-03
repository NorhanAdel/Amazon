const express = require("express");
const router = new express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const authentication = require("../middleware/authntication");

router.post("/register", async (req, res) => {
  const { name, email, number, password, cpassword } = req.body;

  if (!name || !email || !number || !password || !cpassword) {
    return res.status(422).json({ message: "Please fill all fields." });
  }

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(422).json({ message: "User already exists." });
    }

    if (password !== cpassword) {
      return res.status(422).json({ message: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      number,
      password: hashedPassword,
      cpassword: hashedPassword,
    });

    const storedData = await newUser.save();
    const token = await newUser.generateAuthToken();  
    res.status(201).json({ user: storedData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Please fill all fields." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

   
    const token = await user.generateAuthToken();

    res.cookie("Amzoneweb", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: "lax",
    });

  
    user.password = undefined;
    user.cpassword = undefined;

    res.status(200).json({ message: "Login successful!", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/logout", authentication, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((val) => {
      return val.token !== req.token;
    });
    res.clearCookie("Amzoneweb", { path: "/" });
    await req.rootUser.save();
    res.status(200).json({ message: "User logged out successfully" });
    console.log("User logged out");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

router.get("/profile", authentication, async (req, res) => {
  try {
    const userData = await User.findById(req.userID).select(
      "-password -cpassword"
    );
    if (!userData) return res.status(404).json({ message: "User not found" });

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", authentication, async (req, res) => {
  const { name, email, number, password } = req.body;

  try {
    const user = await User.findById(req.userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.number = number || user.number;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.cpassword = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
