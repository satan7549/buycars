const express = require("express");
const {
  getAllMPInventory,
  getUserMPInventry,
  addMPInventory,
} = require("../controllers/inventory.controller");
const { isUserAuthenticated } = require("../middleware/userAuth");

const inventoryRoutes = express.Router();

inventoryRoutes.get("/", getAllMPInventory);
inventoryRoutes.get("/unique", isUserAuthenticated, getUserMPInventry);
inventoryRoutes.post("/add", isUserAuthenticated, addMPInventory);

module.exports = inventoryRoutes;
