import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import path from "path";
import { ObjectId } from "mongodb";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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

(async () => {
  try {
    // Connect to MongoDB once at startup
    await client.connect();
    console.log("Connected to MongoDB");

    // Check Cloudinary connection
    await cloudinary.v2.api.ping();
    console.log("Connected to Cloudinary");

    // Define the route to get products
    app.get("/products", async (req, res) => {
      try {
        const collection = client.db("hubtronics").collection("products");

        // get the 'limit' query parameter from the request
        const limit = parseInt(req.query.limit) || 20; // Default to 20 if no limit is provided

        const products = await collection.find({}).limit(limit).toArray();

        const updatedProducts = await Promise.all(
          products.map(async (product) => {
            if (product.cloudinary_url) {
              console.log(`Using existing Cloudinary URL for ${product.name}`);
              return product;
            }

            const imagePath = product.main_image_path.replace(/\\/g, "/");
            const imageName = path
              .basename(imagePath)
              .replace(/\s+/g, "_")
              .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "");

            try {
              const searchResult = await cloudinary.v2.search
                .expression(`filename:${imageName}`)
                .max_results(1)
                .execute();

              if (searchResult.resources.length > 0) {
                const imageUrl = searchResult.resources[0].url;
                console.log(
                  `Generated Cloudinary URL for ${imageName}: ${imageUrl}`
                );

                await collection.updateOne(
                  { _id: product._id },
                  { $set: { cloudinary_url: imageUrl } }
                );

                return { ...product, cloudinary_url: imageUrl };
              } else {
                console.log(`Image not found for ${imageName}`);
                return product;
              }
            } catch (error) {
              console.error(
                `Error searching for image ${imageName}: ${error.message}`
              );
              return product;
            }
          })
        );

        res.json(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
      }
    });

    app.get("/api/products/:productId", async (req, res) => {
      try {
        const { productId } = req.params;
        const collection = client.db("hubtronics").collection("products");
        const product = await collection.findOne({
          _id: new ObjectId(productId),
        });

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ message: "Error fetching product details" });
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
