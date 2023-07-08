const User = require("../models/userModel");
const verifyToken = require("../utils/jwt");

// @desc   Register a new user
// route   POST /api/users
// @access Public
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
  } catch (err) {
    return next(err);
  }
  // Check Email length
  try {
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must have a minimum of 6 characters");
    }
  } catch (err) {
    return next(err);
  }
  // Check if user email already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401);
      throw new Error("Email already registered.");
    }
  } catch (err) {
    return next(err);
  }
  // Create a User
  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    if (newUser) {
      const { _id, name, email, photo, phone, bio } = newUser;
      verifyToken(res, _id);
      res.status(201).json({ _id, name, email, photo, phone, bio });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    return next(err);
  }
};
