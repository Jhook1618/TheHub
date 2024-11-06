import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

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

// Route to upload image
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // Auto-type detection for images
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Upload failed", error });
        }
        res.json({ success: true, url: result.secure_url }); // Return URL
      }
    );
    // Pipe image to Cloudinary
    result.end(req.file.buffer); // Send file buffer to Cloudinary
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ message: "Error uploading image", error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
