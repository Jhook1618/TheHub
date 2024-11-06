import { MongoClient } from "mongodb";
import fs from "fs/promises"; // Use the promises version of fs
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function loadJSONToMongoDB() {
  try {
    // Read the JSON file
    const jsonData = await fs.readFile("products.json", "utf-8"); // Use fs/promises
    const products = JSON.parse(jsonData); // Parse the JSON data

    // Connect to the MongoDB client
    await client.connect();

    // Specify the database and collection
    const db = client.db("hubtronics");
    const collection = db.collection("products");

    // Insert the JSON data into the MongoDB collection
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products were inserted.`);
  } catch (error) {
    console.error("Error loading JSON to MongoDB:", error);
  } finally {
    await client.close();
  }
}

// Call the function
loadJSONToMongoDB();
