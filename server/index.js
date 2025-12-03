const express = require("express");
const app = express();
require("dotenv").config();
require("./Db/conn");
const cookieparser = require("cookie-parser");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const product = require("./router/product");
const user = require("./router/user");
const order = require("./router/order");
const cart = require("./router/cart");

app.use(express.json());
app.use(cors());
app.use(cookieparser(""));

app.use(product);
app.use(user);
app.use(order);
app.use(cart);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening  on ${PORT}`);
});

DefaultData();
