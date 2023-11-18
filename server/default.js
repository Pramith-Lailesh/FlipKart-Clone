const products = require("./constants/data");
const Product = require("./model/product.schema");

const DefaultData = async () => {
  try {
    await Product.insertMany(products);
    console.log(`data imported successfully`);
  } catch (error) {
    console.log(`error while inserting before data`, error.message);
  }
};

module.exports = DefaultData;
