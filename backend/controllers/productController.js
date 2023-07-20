const Product = require("../models/productModel");

const cloudinary = require("cloudinary").v2;

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
  // Cloudinary configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET,
  });

  // Handle image upload
  let fileData = {};
  try {
    if (req.file) {
      // Save image to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Pinvent App",
          resource_type: "image",
        });
      } catch (err) {
        // return next(err);
        res.status(500);
        throw new Error(err);
      }
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  } catch (err) {
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
      image: fileData.filePath,
    });
    res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
};
// @desc   Get all products
// route   GET /api/products
// @access Private

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ user: req.user.id }).sort(
      "-createdAt"
    );
    res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

// @desc   Get a single product
// route   GET /api/products/:id
// @access Private

exports.getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
};
