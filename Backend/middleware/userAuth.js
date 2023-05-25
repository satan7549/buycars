const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

// Middleware to check if the user is authenticated
const isUserAuthenticated = catchAsyncError(async (req, res, next) => {

  const token = req.headers?.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please Login First to access this",
    });
  }

  // Verify and decode the token using the JWT_SECRET_KEY
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Find the user associated with the decoded token ID and save it in req.user
  req.user = await userModel.findById(decoded.id);

  // Call the next middleware or route handler
  next();
});

module.exports = { isUserAuthenticated };
