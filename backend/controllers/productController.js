const Product = require("../models/productModel");

// @desc   Create a product
// route   POST /api/products
// @access Private
exports.createProduct = async (req, res, next) => {
  const { name, sku, category, quantity, price, description } = req.body;

  // Validation
  try {
    if (!name || !category || !quantity || !price || !description) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }
  } catch (err) {
    return next(err);
  }

  // Manage image upload

  // create a product
  try {
    const product = await Product.create({
      user: req.user._id,
      name,
      sku,
      category,
      quantity,
      price,
      description,
    });
    res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
};
