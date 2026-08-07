import Cart from "../models/Cart.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, image } = req.body;

    // Check if product already exists in cart
    const existingItem = await Cart.findOne({
      user: req.user.id,
      productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();

      return res.status(200).json({
        message: "Quantity updated",
        cartItem: existingItem,
      });
    }

    // Create new cart item
    const cartItem = await Cart.create({
      user: req.user.id,
      productId,
      title,
      price,
      image,
      quantity: 1,
    });

    res.status(201).json({
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get logged-in user's cart
export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user.id,
    });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Product removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};