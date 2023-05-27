const catchAsyncErrors = require("../middleware/catchAsyncError");
const InventoryModel = require("../models/inventoryModels");
const cloudinary = require("cloudinary");

// Function to add a new marketplace inventory entry
const addMPInventory = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
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
  const newEntry = new InventoryModel(req.body);
  await newEntry.save();
  res.status(200).json({ message: "addedd successs", newEntry });
});

// Function to retrieve all marketplace inventory entries
const getAllMPInventory = catchAsyncErrors(async (req, res, next) => {
  const allInventory = await InventoryModel.find()
    .populate("user")
    .populate("oemSpecs");
  res.status(200).json({ message: "success", allInventory });
});

// Function to retrieve single marketplace inventory entries
const getSingleMPInventory = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const singleProductDetail = await InventoryModel.findById({
    _id: id,
  }).populate("oemSpecs");
  res.status(200).json({ message: "success", singleProductDetail });
});

const getUserMPInventry = catchAsyncErrors(async (req, res, next) => {
  const userInventory = await InventoryModel.find({ user: req.user._id });
  res.status(200).json({ message: "success", userInventory });
});

//Delete Inventory only authenticate user
const deleteInventory = catchAsyncErrors(async (req, res, next) => {
  const inventory = await InventoryModel.findById(req.params.id);

  if (!inventory) {
    return res.status(404).json({ message: "Inventory not found" });
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < inventory.images.length; i++) {
    await cloudinary.v2.uploader.destroy(inventory.images[i].public_id);
  }

  await InventoryModel.findByIdAndDelete({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Inventory Delete Successfully",
  });
});

const updateInventoryItem = catchAsyncErrors(async (req, res, next) => {
  let inventory = await InventoryModel.findById(req.params.id);

  if (!inventory) {
    return res.status(404).json({ message: "Inventory not found" });
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < inventory.images.length; i++) {
      await cloudinary.v2.uploader.destroy(inventory.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  let updatedInventory = await InventoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    updatedInventory,
  });
});

module.exports = {
  addMPInventory,
  getAllMPInventory,
  getSingleMPInventory,
  getUserMPInventry,
  updateInventoryItem,
  deleteInventory,
};
