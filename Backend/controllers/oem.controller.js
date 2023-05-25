const OEM_Specs = require("../models/oemModels");

const catchAsyncErrors = require("../middleware/catchAsyncError");

const getOemAllData = catchAsyncErrors(async (req, res, next) => {
  try {
    const { model, year } = req.query;
    // Construct the search query based on the provided model and year
    let query = {};

    if (model && year) {
      query = {
        model: { $regex: new RegExp(model, "i") },
        year: parseInt(year),
      };
    } else if (model) {
      query = { model: { $regex: new RegExp(model, "i") } };
    } else if (year) {
      query = { year: parseInt(year) };
    }

    // Find the OEM specs that match the search query
    const oemData = await OEM_Specs.find(query);
    if (oemData.length === 0) {
      // No matching OEM specs found
      res.status(404).json({
        message: "No OEM specs found for the provided model and year",
      });
    } else {
      // Matching OEM specs found
      res.status(200).json(oemData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  getOemAllData,
};
