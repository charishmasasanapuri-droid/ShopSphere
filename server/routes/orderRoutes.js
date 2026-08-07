import express from "express";
import {
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Place Order
router.post("/", protect, placeOrder);

// Get User Orders
router.get("/", protect, getOrders);

// Get All Orders (Admin)
router.get("/all", protect, getAllOrders);

// Update Order Status (Admin)
router.put("/:id", protect, updateOrderStatus);

export default router;