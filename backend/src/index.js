import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import translateRoutes from "./routes/translate.js";

dotenv.config();
const app = express();



// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use("/api", authRoutes);
app.use("/api", translateRoutes);

app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});



// MongoDB connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

   app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });