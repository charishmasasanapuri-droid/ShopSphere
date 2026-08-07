import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // <-- Add this here

// Routes
app.use("/api/auth", authRoutes); // <-- Add this here
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Test Route
app.get("/", (req, res) => {
  res.send("ShopSphere Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});