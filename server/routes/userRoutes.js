import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getAllUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Get all users
router.get("/", protect, getAllUsers);

// Delete user
router.delete("/:id", protect, deleteUser);

export default router;