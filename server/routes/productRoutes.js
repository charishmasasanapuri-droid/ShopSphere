import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
  seedProducts,
} from "../controllers/productController.js";

const router = express.Router();

// Seed Products
router.get("/seed", seedProducts);

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

// Add Product
router.post("/", addProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

router.post("/:id/review", addReview);

export default router;