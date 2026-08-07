import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      phone,
      paymentMethod,
      buyNowProduct,
    } = req.body;

    let products = [];
    let totalAmount = 0;

    // Buy Now
    if (buyNowProduct) {
      products.push({
        productId: buyNowProduct._id,
        title: buyNowProduct.name,
        price: buyNowProduct.price,
        image: buyNowProduct.image,
        quantity: 1,
      });

      totalAmount = buyNowProduct.price;
    }

    // Cart Checkout
    else {
      const cartItems = await Cart.find({
        user: req.user.id,
      });

      if (cartItems.length === 0) {
        return res.status(400).json({
          message: "Cart is empty",
        });
      }

      products = cartItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      }));

      totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      
    }
    // Check stock and update inventory
for (const item of products) {
  const product = await Product.findById(item.productId);

  if (!product) {
    return res.status(404).json({
      message: `${item.title} not found`,
    });
  }

  if (product.stock < item.quantity) {
    return res.status(400).json({
      message: `${product.name} has only ${product.stock} item(s) left in stock.`,
    });
  }

  // Reduce stock
  product.stock -= item.quantity;

  await product.save();
}

    // Demo Payment
    const paymentStatus =
      paymentMethod === "Online Payment"
        ? "Paid"
        : "Pending";

    const transactionId =
      paymentMethod === "Online Payment"
        ? "TXN" + Date.now()
        : "";

    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
      shippingAddress,
      phone,
      paymentMethod,
      paymentStatus,
      transactionId,
    });

    await order.save();

    if (!buyNowProduct) {
  await Cart.deleteMany({
    user: req.user.id,
  });
}
    
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};