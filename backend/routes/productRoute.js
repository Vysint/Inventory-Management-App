const router = require("express").Router();

const protect = require("../middlewares/authMiddleware");
const { upload } = require("../utils/upload");
const {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/", protect, upload.single("image"), createProduct);

router.get("/", protect, getProducts);

router.get("/:id", protect, getSingleProduct);

router.delete("/:id", protect, deleteProduct);

module.exports = router;
