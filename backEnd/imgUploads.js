import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
// import fs from "fs";
// import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Set up Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload multiple images from a directory
app.post("/upload-directory", upload.array("images"), async (req, res) => {
  try {
    // Array to store Cloudinary URLs
    const uploadResults = [];

    // Loop through each file and upload to Cloudinary
    for (const file of req.files) {
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              uploadResults.push(result.secure_url);
              resolve();
            }
          }
        );
        // Pipe the file buffer to the Cloudinary upload stream
        uploadStream.end(file.buffer);
      });
    }

    res.json({ success: true, urls: uploadResults }); // Return all URLs
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Error uploading images", error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
