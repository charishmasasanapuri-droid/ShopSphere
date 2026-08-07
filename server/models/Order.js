import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },

    // ✅ NEW
    paymentStatus: {
      type: String,
      default: "Pending",
    },

    // ✅ NEW
    transactionId: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;