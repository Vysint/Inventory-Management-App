const router = require("express").Router();

const { register, login, logout } = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
