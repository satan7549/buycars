const express = require("express");
const {
  getAllMPInventory,
  getUserMPInventry,
  addMPInventory,
  getSingleMPInventory,
  deleteInventory,
  updateInventoryItem,
} = require("../controllers/inventory.controller");
const { isUserAuthenticated } = require("../middleware/userAuth");

const inventoryRoutes = express.Router();

inventoryRoutes.get("/", getAllMPInventory);
inventoryRoutes.get("/:id", getSingleMPInventory);
inventoryRoutes.get("/unique", isUserAuthenticated, getUserMPInventry);
inventoryRoutes.post("/add", isUserAuthenticated, addMPInventory);
inventoryRoutes.patch("/update/:id", isUserAuthenticated, updateInventoryItem);
inventoryRoutes.delete("/delete/:id", isUserAuthenticated, deleteInventory);

module.exports = inventoryRoutes;
