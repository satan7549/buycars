const OEM_Specs = require("../models/oemModels");

const catchAsyncErrors = require("../middleware/catchAsyncError");

const getOemAllData = catchAsyncErrors(async (req, res, next) => {
  try {
    const { search } = req.query;
    const arr = search.split(" ");
    const year = arr[arr.length - 1];
    const model = arr.splice(0, arr.length - 1).join(" ");
    // const [model, year] = search.split(" ");

    console.log("model", model, "year", year);
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

// const getOemAllData = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const { search } = req.query;
//     const [model, year] = search.split(" ");

//     let query = {};

//     if (model && year && !isNaN(parseInt(year))) {
//       query.model = { $regex: new RegExp(model, "i") };
//       query.year = parseInt(year);
//     } else if (model) {
//       query.model = { $regex: new RegExp(model, "i") };
//     } else if (year) {
//       query.year = parseInt(year);
//     }

//     const oemData = await OEM_Specs.find(query);
//     if (oemData.length === 0 && Object.keys(query).length > 0) {
//       res.status(404).json({
//         message: "No OEM specs found for the provided model and year",
//       });
//     } else {
//       res.status(200).json(oemData);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = {
  getOemAllData,
};
