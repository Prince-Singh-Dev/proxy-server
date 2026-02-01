import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected via proxy"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ===================== GET documents =====================
app.get("/api/:collection", async (req, res) => {
  try {
    const { collection } = req.params;
    const db = mongoose.connection.db;
    const data = await db.collection(collection).find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ===================== POST document =====================
app.post("/api/:collection", async (req, res) => {
  try {
    const { collection } = req.params;
    const data = req.body;

    const db = mongoose.connection.db;
    const result = await db.collection(collection).insertOne(data);

    res.json(result); // { acknowledged: true, insertedId: ... }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ===================== PUT / UPDATE document =====================
app.put("/api/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    const updateData = req.body;

    const db = mongoose.connection.db;
    const result = await db
      .collection(collection)
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    res.json(result.value); // returns the updated document
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ===================== DELETE document =====================
app.delete("/api/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;

    const db = mongoose.connection.db;
    const result = await db
      .collection(collection)
      .deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    res.json(result); // { acknowledged: true, deletedCount: 1 }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ===================== Start server =====================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
