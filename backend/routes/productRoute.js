const router = require("express").Router();

const { createProduct } = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");
const { upload } = require("../utils/upload");

router.post("/", protect, upload.single("image"), createProduct);

module.exports = router;
