const bcrypt = require("bcryptjs");
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

// @desc   Login a  user
// route   POST /api/users
// @access Public

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Validate request
  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }
  } catch (err) {
    return next(err);
  }

  // Check if user exists
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found, please register instead.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Wrong Password");
    }
    verifyToken(res, user._id);
    res.status(200).json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    return next(err);
  }
};

// @desc   Logout user
// route   POST /api/users/logout
// @access Public

exports.logout = async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ Message: "User logged out successfully" });
};
