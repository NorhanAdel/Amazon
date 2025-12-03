const Products = require("./model/product");
const productdata = require("./constant/product");

const DefaultData = async () => {
  try {
    
    const existingData = await Products.find();
    if (existingData.length === 0) {
      const storeData = await Products.insertMany(productdata);
      console.log("Data inserted successfully:", storeData);
    } else {
      console.log("Data already exists in the database.");
    }
  } catch (err) {
    console.log("Error in DefaultData function:", err);
  }
};

module.exports = DefaultData;
