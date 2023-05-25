const mongoose = require("mongoose");

const oemSpecsSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  listPrice: {
    type: Number,
    required: true,
  },
  colors: [
    {
      type: String,
    },
  ],
  mileage: {
    type: Number,
    min: [0, "Mileage should be a non-negative value"],
    max: [100, "Mileage cannot exceed 100"],
  },
  power: {
    type: Number,
  },
  maxSpeed: {
    type: Number,
    min: [0, "Max speed should be a non-negative value"],
    max: [500, "Max speed cannot exceed 500"],
  },
});

// Create the OEM model
const oemModel = mongoose.model("OEM_Specs", oemSpecsSchema);

module.exports = oemModel;
