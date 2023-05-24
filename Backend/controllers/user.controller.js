const catchAsyncErrors = require("../middleware/catchAsyncError");
const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jswToken");

// register User;
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const hashedPassword = await bcrypt.hash(password, 5);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  sendToken(res, 201, user);
});

//Login User
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: true,
      message: "Please fill the Email and Password Both",
    });
  }

  //select useing because by default password has select: false
  const userExists = await userModel.findOne({ email });

  if (!userExists) {
    return res.status(401).json({
      message: "Invalid Email or Password",
    });
  }

  //password compare
  const isPassword = await userExists.comparePassword(password);

  if (!isPassword) {
    return res.status(401).json({
      message: "Invalid Email or Password",
    });
  }

  sendToken(res, 200, userExists);
});

//Logout User
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const getAllUsers = catchAsyncErrors((req, res, next) => {
  res.send("All user");
});

module.exports = {
  registerUser,
  userLogin,
  logoutUser,
  getAllUsers,
};
