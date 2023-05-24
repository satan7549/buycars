const express = require("express");
const { getAllUsers, registerUser, userLogin, logoutUser } = require("../controllers/user.controller");
const { isUserAuthenticated } = require("../middleware/userAuth");

const userRoutes = express.Router();

userRoutes.get("/",isUserAuthenticated, getAllUsers);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", userLogin);
userRoutes.get("/logout", logoutUser);

module.exports = userRoutes;
