const catchAsyncErrors = require("../middleware/catchAsyncError");
const InventoryModel = require("../models/inventoryModels");

// Function to add a new marketplace inventory entry
const addMPInventory = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const newEntry = new InventoryModel(req.body);
  await newEntry.save();
  res.status(200).json({ message: "addedd successs", newEntry });
});

// Function to retrieve all marketplace inventory entries
const getAllMPInventory = catchAsyncErrors(async (req, res, next) => {
  const allInventory = await InventoryModel.find();
  res.status(200).json({ message: "success", allInventory });
});

const getUserMPInventry = catchAsyncErrors(async (req, res, next) => {
  const userInventory = await InventoryModel.find({ user: req.user._id });
  res.status(200).json({ message: "success", userInventory });
});

module.exports = {
  addMPInventory,
  getAllMPInventory,
  getUserMPInventry,
};
