import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

// MongoDB connection setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  },
});

let db;

const connectDB = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db("hubtronics");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
};

const cleanImageName = (imageName) => {
  const baseName = imageName.split("_")[0]; // Get the part before the underscore
  return baseName.split(".")[0]; // Remove file extension
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());

// Limit of products to process per hour
const PRODUCTS_PER_HOUR = 500;

// Endpoint to update Cloudinary URLs in MongoDB
app.get("/update-cloudinary-urls", async (req, res) => {
  try {
    await connectDB(); // Ensure DB is connected before starting the operation
    const collection = db.collection("products");

    const products = await collection
      .find({ cloudinary_url: "", cloudinary_checked: { $ne: true } })
      .limit(PRODUCTS_PER_HOUR)
      .toArray();

    console.log(`Found ${products.length} products to process.`);

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        let cloudinaryUrl = product.cloudinary_url;

        if (!cloudinaryUrl) {
          const imageName = cleanImageName(product.image_src.split("/").pop());
          console.log(`Searching for Cloudinary image with base name: ${imageName}`);

          try {
            const searchResult = await cloudinary.v2.search
              .expression(`filename:${imageName}*`)
              .max_results(1)
              .execute();

            if (searchResult.resources.length > 0) {
              cloudinaryUrl = searchResult.resources[0].secure_url;
              console.log(`Cloudinary URL found for ${product.name}: ${cloudinaryUrl}`);

              // Update MongoDB with Cloudinary URL
              const updateResult = await collection.updateOne(
                { _id: product._id },
                { $set: { cloudinary_url: cloudinaryUrl, cloudinary_checked: true } }
              );

              if (updateResult.modifiedCount > 0) {
                console.log(`Successfully updated MongoDB for product: ${product.name}`);
              } else {
                console.log(`No update made for product: ${product.name}. It may have already been updated.`);
              }
            } else {
              console.log(`No Cloudinary image found for ${product.name}`);
              await collection.updateOne(
                { _id: product._id },
                { $set: { cloudinary_checked: true } }
              );
              console.log(`Marked ${product.name} as checked without finding a Cloudinary image.`);
            }
          } catch (error) {
            console.error(`Error searching image for ${product.name}:`, error);
            console.error("Full error details:", error);
          }
        } else {
          console.log(`Cloudinary URL already available for ${product.name}: ${cloudinaryUrl}`);
        }

        return { ...product, cloudinary_url: cloudinaryUrl };
      })
    );

    res.json(updatedProducts);
  } catch (error) {
    console.error("Error updating Cloudinary URLs:", error);
    res.status(500).json({ message: "Error updating Cloudinary URLs" });
  }
});

// Endpoint to retrieve products
app.get("/products", async (req, res) => {
  try {
    await connectDB(); // Ensure DB is connected before fetching data
    const collection = db.collection("products");

    const products = await collection
      .find({})
      .project({ name: 1, price: 1, description: 1, cloudinary_url: 1, image_src: 1 })
      .toArray();

    console.log(`Retrieved ${products.length} products from MongoDB.`);

    const productsWithImages = products.map((product) => ({
      ...product,
      image_url: product.cloudinary_url || product.image_src,
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Error retrieving products" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
