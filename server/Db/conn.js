const mongoose = require("mongoose");
mongoose
  .connect(process.env.URL)
  .then(() => console.log("Databse Connected"))
  .catch((err) => console.log(err));
