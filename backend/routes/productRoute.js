const router = require("express").Router();

const { createProduct } = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");

router.post("/", protect, createProduct);

module.exports = router;
