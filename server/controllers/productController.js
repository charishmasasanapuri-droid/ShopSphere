import Product from "../models/Product.js";

// Seed Products
export const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany();

    const products = [
      {
        name: "Speaker",
        category: "Electronics",
        price: 1999,
        discount: "30% OFF",
        description:
          "Enjoy powerful bass and crystal-clear sound with this premium Bluetooth speaker. It features long battery life, wireless connectivity, and a stylish portable design.",
        image: "/uploads/1784899157627-speaker.png",
        stock: 18,
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 2499,
        discount: "20% OFF",
        description:
          "Experience immersive sound with noise cancellation, comfortable ear cushions, and up to 30 hours of battery life.",
        image: "/uploads/1784899792581-headphones.png",
        stock: 15,
      },
      {
        name: "Smart Watch",
        category: "Wearables",
        price: 3999,
        discount: "15% OFF",
        description:
          "Track your fitness, monitor your heart rate, receive notifications, and enjoy a long-lasting battery in a sleek smartwatch.",
       image: "/uploads/1784899931961-smartwatch.png",
        stock: 12,
      },
      {
  name: "Laptop",
  category: "Electronics",
  price: 54999,
  discount: "15% OFF",
  description:
    "Experience powerful performance with this high-speed laptop featuring a Full HD display, Intel Core i5 processor, 16GB RAM, 512GB SSD storage, and long-lasting battery life. It is ideal for students, professionals, gaming, and everyday multitasking.",
  image: "/uploads/1784900238313-laptop.png",
  stock: 8,
},
      {
        name: "Mobile Phone",
        category: "Mobiles",
        price: 18999,
        discount: "10% OFF",
        description:
          "A powerful smartphone with a high-resolution display, fast processor, advanced camera system, and all-day battery life.",
        image: "/uploads/1784900622977-mobile.png",
        stock: 10,
      },
    ];

    await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: "Products seeded successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Review
export const addReview = async (req, res) => {
  try {
    const { user, rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

   product.reviews.push({
  user,
  rating: Number(rating),
  comment,
});

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Product
export const addProduct = async (req, res) => {
  try {
    console.log("Received Product:", req.body);

    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};