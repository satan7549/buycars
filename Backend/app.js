const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: "*"
  })
);
// ["http://localhost:3000","*"],
//     methods: ["POST", "GET"],
//     credentials: true,

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});

/* import all routes */
const user = require("./routes/user.route");

app.use("/user", user);

module.exports = app;
