import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import path from "path";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// MongoDB URI from .env file
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Hard-coded Cloudinary API credentials
cloudinary.config({
  cloud_name: "deafmthof", // Replace with your Cloudinary cloud name
  api_key: "247347863723954", // Replace with your Cloudinary API key
  api_secret: "kYPKhul8iCOI10BrXkE1XQH7aoQ", // Replace with your Cloudinary API secret
});

app.use(cors());

// Define the route to get products
app.get("/products", async (req, res) => {
  try {
    // Check MongoDB connection
    await client.connect();
    console.log("Connected to MongoDB");

    const collection = client.db("hubtronics").collection("products");
    const products = await collection.find({}).toArray();

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        // Skip if Cloudinary URL already exists
        if (product.cloudinary_url) {
          console.log(`Using existing Cloudinary URL for ${product.name}`);
          return product;
        }

        // Extract the image name from main_image_path (replace backslashes)
        const imagePath = product.main_image_path.replace(/\\/g, "/");
        const imageName = path.basename(imagePath);

        // Ensure the image name is URL-safe
        const cloudinarySafeName = imageName
          .replace(/\s+/g, "_") // Replace spaces with underscores
          .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ""); // Remove special characters

        // Search for the image in Cloudinary
        try {
          const searchResult = await cloudinary.v2.search
            .expression(`filename:${cloudinarySafeName}`)
            .max_results(1)
            .execute();

          if (searchResult.resources.length > 0) {
            const imageUrl = searchResult.resources[0].url;
            console.log(
              `Generated Cloudinary URL for ${cloudinarySafeName}: ${imageUrl}`
            );

            // Update product in MongoDB with the Cloudinary URL
            await collection.updateOne(
              { _id: product._id },
              { $set: { cloudinary_url: imageUrl } }
            );

            return {
              ...product,
              cloudinary_url: imageUrl,
            };
          } else {
            console.log(`Image not found for ${cloudinarySafeName}`);
            return product; // No image found, return the product as is
          }
        } catch (error) {
          console.error(
            `Error searching for image ${cloudinarySafeName}: ${error.message}`
          );
          return product; // Handle error gracefully
        }
      })
    );

    res.json(updatedProducts); // Send the final products data with Cloudinary URLs
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  } finally {
    // Check Cloudinary connection by making a simple API request
    cloudinary.v2.api.ping(function (error) {
      if (error) {
        console.error("Error connecting to Cloudinary:", error);
      } else {
        console.log("Connected to Cloudinary");
      }
    });

    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
