const catchAsyncErrors = require("../middleware/catchAsyncError");
const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jswToken");

// Register User
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill the Credentials",
    });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 5);

  // Create a new user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  // Send token in the response
  sendToken(res, 201, user);
});

// Login User
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in both Email and Password",
    });
  }

  // Find the user by email
  const userExists = await userModel.findOne({ email });

  if (!userExists) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  // Compare the provided password with the stored password
  const isPassword = await userExists.comparePassword(password);

  if (!isPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  // Send token in the response
  sendToken(res, 200, userExists);
});

// Logout User
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get All Users
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log("req", req.user);
    const ID = req.user._id;
    const users = await userModel.find(ID);
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
    });
  }
});

module.exports = {
  registerUser,
  userLogin,
  logoutUser,
  getAllUsers,
};
