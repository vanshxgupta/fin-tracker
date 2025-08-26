const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config(); // make sure .env works

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "finance-tracker", // folder name inside Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // allowed file types
  },
});

const upload = multer({ storage });

module.exports = upload;
