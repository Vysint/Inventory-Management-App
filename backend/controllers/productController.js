const Product = require("../models/productModel");

// @desc   Create a product
// route   POST /api/products
// @access Private
exports.createProduct = async (req, res, next) => {
  res.send("Product created");
};
