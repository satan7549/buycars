const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

/* import all routes */
const user = require("./routes/user.route");
const OEM = require("./routes/oem.route");
const MP_Inventory = require("./routes/inventory.route");

app.use("/user", user);
app.use("/oem", OEM);
app.use("/inventory", MP_Inventory);

module.exports = app;
