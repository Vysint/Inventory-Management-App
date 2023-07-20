const router = require("express").Router();

const protect = require("../middlewares/authMiddleware");
const { upload } = require("../utils/upload");
const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

router.post("/", protect, upload.single("image"), createProduct);

router.get("/", protect, getProducts);

module.exports = router;
