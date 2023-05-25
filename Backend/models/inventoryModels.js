const mongoose = require("mongoose");

const inventoryModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  oemSpecs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OEM_Specs",
    required: true,
  },
  kmOnOdometer: {
    type: Number,
  },
  majorScratches: {
    type: Boolean,
  },
  originalPaint: {
    type: Boolean,
  },
  accidentsReported: {
    type: Number,
  },
  previousBuyers: {
    type: Number,
  },
  registrationPlace: {
    type: String,
  },
  title: {
    type: String,
    require: [true, "Please Enter Title"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter car Price"],
  },
  description: {
    type: String,
    required: [true, "Please Enter car Description"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const InventoryModel = mongoose.model("Marketplace_Inventory", inventoryModel);

module.exports = InventoryModel;
