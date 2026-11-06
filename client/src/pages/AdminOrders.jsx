import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://shopsphere-l2ul.onrender.com/api/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://shopsphere-l2ul.onrender.com/api/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order status updated successfully");
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Admin Orders
      </h1>

      <AdminNavbar />

      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Customer</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Products</th>
              <th className="border p-3">Address</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Payment</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Order Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border p-3">
                  {order.user?.name}
                </td>

                <td className="border p-3">
                  {order.user?.email}
                </td>

                <td className="border p-3">
                  {order.products.map((product, index) => (
                    <div key={index}>
                      {product.title} × {product.quantity}
                    </div>
                  ))}
                </td>

                <td className="border p-3">
                  {order.shippingAddress}
                </td>

                <td className="border p-3">
                  {order.phone}
                </td>

                <td className="border p-3">
                  ₹{order.totalAmount}
                </td>

                <td className="border p-3">
                  {order.paymentMethod}
                </td>

                <td className="border p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className={`rounded-md px-3 py-2 font-semibold text-white focus:outline-none
                      ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Processing"
                          ? "bg-blue-500"
                          : order.status === "Shipped"
                          ? "bg-purple-600"
                          : order.status === "Delivered"
                          ? "bg-green-600"
                          : "bg-gray-500"
                      }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

                <td className="border p-3">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;