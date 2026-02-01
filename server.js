import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected on Render"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Example endpoint: get all documents from a collection
app.get("/api/:collection", async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const docs = await mongoose.connection.db.collection(collectionName).find({}).toArray();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
