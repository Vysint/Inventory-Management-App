const router = require("express").Router();

const {
  register,
  login,
  logout,
  getUser,
  loginStatus,
  updateUserProfile,
  changePassword,
  forgotPassword,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/getuser", protect, getUser);

router.get("/loggedin", loginStatus);

router.patch("/updateuser", protect, updateUserProfile);

router.patch("/changepassword", protect, changePassword);

router.post("/forgotpassword", forgotPassword);

module.exports = router;
