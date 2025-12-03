const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid email address");
      }
    },
  },
  number: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

 
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.secret_key, {
    expiresIn: "1h",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

 
userSchema.methods.addDataCart = async function (cart) {
  try {
    const existingProduct = this.carts.find((item) =>
      item.productId.equals(cart._id)
    );

    if (existingProduct) {
      existingProduct.quantity += 1;  
    } else {
      this.carts.push({ productId: cart._id, quantity: 1 }); // إضافة المنتج الجديد
    }

    await this.save(); 
    return this.carts;
  } catch (err) {
    console.error("Error in addDataCart:", err);
    throw err;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;


