import express from "express"; // Import express
import { MongoClient, ServerApiVersion } from "mongodb"; // Import MongoClient and ServerApiVersion from mongodb
import cors from "cors"; // Import cors
import dotenv from "dotenv";

dotenv.config();

const app = express(); // Create an Express application
const port = 5000; // Define the port to listen on

// MongoDB connection URI
const uri = process.env.MONGODB_URI;
// Create a new MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Use CORS middleware
app.use(cors());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the HUBTronics API!"); // Respond with a welcome message
});

// Define a route to get products(API End Point)
app.get("/products", async (req, res) => {
  try {
    await client.connect(); // Connect to the MongoDB server
    const collection = client.db("hubtronics").collection("products"); // Access the products collection
    const products = await collection.find({}).toArray(); // Fetch all products
    res.json(products); // Send products as JSON response
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: "Error fetching products" }); // Send error response
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log server status
});
