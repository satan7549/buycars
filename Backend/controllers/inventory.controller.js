const catchAsyncErrors = require("../middleware/catchAsyncError");
const InventoryModel = require("../models/inventoryModels");
const cloudinary = require("cloudinary");

// Function to add a new marketplace inventory entry
const addMPInventory = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "cars",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;
  console.log(req.body);
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
