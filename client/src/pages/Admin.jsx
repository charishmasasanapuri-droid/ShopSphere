import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminCharts from "../components/AdminCharts";

function Admin() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
  totalProducts: 0,
  totalOrders: 0,
  totalUsers: 0,
  totalRevenue: 0,
});
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newProduct, setNewProduct] = useState({
  name: "",
  category: "",
  price: "",
  discount: "",
  description: "",
  image: "",
  stock: "",
});

 useEffect(() => {
  fetchProducts();
  fetchDashboardStats();
}, []);

const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
  "http://localhost:5000/api/admin/dashboard",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    setStats(response.data);
  } catch (error) {
    console.log(error);
  }
};

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Product
  const handleAddProduct = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );

      fetchProducts();
      fetchDashboardStats();

      setNewProduct({
  name: "",
  category: "",
  price: "",
  discount: "",
  description: "",
  image: "",
  stock: "",
});

      setShowForm(false);

      alert("Product Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  console.log("Selected file name:", file.name);

  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
        console.log("Upload Response:", response.data);

    setNewProduct((prev) => ({
      ...prev,
      image: response.data.image,
    }));

    alert("Image uploaded successfully!");
  } catch (error) {
    console.log(error);
    alert("Image upload failed");
  }
};

  // Edit Product
  const handleEditProduct = (product) => {
    
    setIsEditing(true);
    setEditingId(product._id);

    setNewProduct({
  name: product.name,
  category: product.category,
  price: product.price,
  discount: product.discount,
  description: product.description,
  image: product.image,
  stock: product.stock,
});

    setShowForm(true);
  };
  // Update Product
const handleUpdateProduct = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/products/${editingId}`,
      newProduct
    );

    fetchProducts();
    fetchDashboardStats();

    setNewProduct({
  name: "",
  category: "",
  price: "",
  discount: "",
  description: "",
  image: "",
  stock: "",
});

    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);

    alert("Product Updated Successfully");
  } catch (error) {
    console.log(error);
    alert("Failed to update product");
  }
};

  // Delete Product
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();
      fetchDashboardStats();

      alert("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-10">
     <h1 className="text-4xl font-bold text-center mb-10">
  Admin Dashboard
</h1>
<AdminNavbar />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg text-center">
    <h2 className="text-lg font-semibold">Total Products</h2>
    <p className="text-3xl font-bold mt-2">
      {stats.totalProducts}
    </p>
  </div>

  <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg text-center">
    <h2 className="text-lg font-semibold">Total Orders</h2>
    <p className="text-3xl font-bold mt-2">
      {stats.totalOrders}
    </p>
  </div>

  <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg text-center">
    <h2 className="text-lg font-semibold">Total Users</h2>
    <p className="text-3xl font-bold mt-2">
      {stats.totalUsers}
    </p>
  </div>

  <div className="bg-red-500 text-white rounded-xl p-6 shadow-lg text-center">
    <h2 className="text-lg font-semibold">Total Revenue</h2>
    <p className="text-3xl font-bold mt-2">
      ₹{stats.totalRevenue}
    </p>
  </div>

</div>
        <AdminCharts stats={stats} />

      <div className="bg-white rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Product Management
          </h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            {showForm ? "Close Form" : "+ Add Product"}
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-gray-100 p-6 rounded-lg mb-6">

            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
                className="border p-3 rounded"
              />

              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value,
                  })
                }
                className="border p-3 rounded"
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
                className="border p-3 rounded"
              />

              <input
                type="text"
                placeholder="Discount"
                value={newProduct.discount}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    discount: e.target.value,
                  })
                }
                className="border p-3 rounded"
              />
              <textarea
  placeholder="Product Description"
  value={newProduct.description}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      description: e.target.value,
    })
  }
  className="border p-3 rounded col-span-2"
  rows="4"
/>

  <input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="border p-3 rounded"
/>
          {newProduct.image && (
  <img
    src={`http://localhost:5000${newProduct.image}`}
    alt="Preview"
    className="w-24 h-24 object-cover mt-3 rounded"
  />
)}

              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: e.target.value,
                  })
                }
                className="border p-3 rounded"
              />

            </div>

           <button
  onClick={isEditing ? handleUpdateProduct : handleAddProduct}
  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
>
  {isEditing ? "Update Product" : "Save Product"}
</button>
          </div>
        )}

        {/* Product Table */}
        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Image</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Discount</th>
              <th className="border p-3">Stock</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>

                <td className="border p-3">
                 <img
  src={`http://localhost:5000${product.image}`}
  alt={product.name}
  className="w-16 h-16 object-cover mx-auto rounded"
/>
                </td>

                <td className="border p-3">{product.name}</td>

                <td className="border p-3">{product.category}</td>

                <td className="border p-3">₹{product.price}</td>

                <td className="border p-3">{product.discount}</td>

                <td className="border p-3">{product.stock}</td>

                <td className="border p-3">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Admin;