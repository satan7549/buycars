// Importing required modules and files
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const ConnectDB = require("./config/db.connect");
const cloudinary = require("cloudinary");

/* App connects to the database */

// Setting up the port
const port = process.env.PORT || 8090;

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Starting the server and connecting to the database
const server = app.listen(port, async () => {
  await ConnectDB();
  console.log(`Server running on http://localhost:${port}`);
});

// Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
