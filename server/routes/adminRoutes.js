import express from "express";
import jwt from "jsonwebtoken";

import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

const router = express.Router();

// ================= Admin Login =================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      message: "Admin Login Successful",
    });
  }

  return res.status(401).json({
    message: "Invalid Admin Credentials",
  });
});

// ================= Dashboard Statistics =================
router.get("/dashboard", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    let totalRevenue = 0;

    orders.forEach((order) => {
      totalRevenue += Number(order.totalAmount || 0);
    });

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
});

export default router;