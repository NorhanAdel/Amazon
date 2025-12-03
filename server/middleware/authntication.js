const User = require("../model/user");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.Amzoneweb;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findById(verifiedToken._id);
    if (!rootUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authentication;
