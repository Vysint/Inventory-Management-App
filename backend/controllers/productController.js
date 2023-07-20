const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/upload");

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

  // Handle image upload
  let fileData = {};
  try {
    if (req.file) {
      fileData = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  } catch (er) {
    return next(err);
  }

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
      image: fileData,
    });
    res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
};
