const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected via proxy"))
  .catch((err) => console.error("MongoDB connection error:", err));

// GET
app.get("/api/:collection", async (req, res) => {
  try {
    const { collection } = req.params;
    const db = mongoose.connection.db;
    const data = await db.collection(collection).find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
app.post("/api/:collection", async (req, res) => {
  try {
    const { collection } = req.params;
    const db = mongoose.connection.db;
    const result = await db.collection(collection).insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
app.put("/api/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    const db = mongoose.connection.db;
    const result = await db.collection(collection).findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: req.body },
      { returnDocument: "after" }
    );
    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    const db = mongoose.connection.db;
    const result = await db.collection(collection).deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Proxy server running on", PORT));
