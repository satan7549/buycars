const express = require("express");
const { getOemAllData } = require("../controllers/oem.controller");

const omeRoutes = express.Router();

omeRoutes.get("/", getOemAllData);

module.exports = omeRoutes;
