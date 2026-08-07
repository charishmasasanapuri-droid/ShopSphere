import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

 // Download Invoice
const downloadInvoice = (order) => {
  const doc = new jsPDF();

  // ===========================
  // Header
  // ===========================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("SHOPSPHERE", 20, 20);

  doc.setFontSize(18);
  doc.text("INVOICE", 20, 32);

  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(20, 38, 190, 38);

  // ===========================
  // Order Details
  // ===========================
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  let y = 50;

doc.text(
  `Order ID : #${order._id.slice(-6).toUpperCase()}`,
  20,
  y
);

y += 10;

  doc.text(
  `Date : ${new Date(order.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )}`,
  20,
  y
);
  y += 10;

  doc.text(`Shipping Address : ${order.shippingAddress}`, 20, y);
  y += 10;

  doc.text(`Phone Number : ${order.phone}`, 20, y);
  y += 10;

  doc.text(`Payment Method : ${order.paymentMethod}`, 20, y);
  y += 10;

  doc.text(`Payment Status : ${order.paymentStatus}`, 20, y);
  y += 10;

  if (order.transactionId) {
    doc.text(
      `Transaction ID : ${order.transactionId}`,
      20,
      y
    );
    y += 10;
  }

  // ===========================
  // Products Heading
  // ===========================
  y += 5;

  doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Products", 20, y);

y += 10;
  // ===========================
  // Table Header
  // ===========================
  doc.setFontSize(13);

  doc.text("Product", 20, y);
  doc.text("Quantity", 105, y);
  doc.text("Price", 150, y);

  y += 3;

  doc.line(20, y, 190, y);

  y += 10;

  // ===========================
  // Product Rows
  // ===========================
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  order.products.forEach((product) => {
    doc.text(product.title, 20, y);
    doc.text(String(product.quantity), 110, y);
    doc.text(`Rs. ${product.price}`, 155, y);
    y += 10;
  });

  // ===========================
  // Total
  // ===========================
  doc.line(20, y, 190, y);

  y += 15;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  doc.text(
  `Total Amount : Rs. ${order.totalAmount}`,
  20,
  y
);

  // ===========================
  // Footer
  // ===========================
  y += 20;

  doc.setFontSize(16);

  doc.text(
    "Thank you for shopping with ShopSphere!",
    20,
    y
  );

  y += 10;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);

  doc.text(
    "This is a computer-generated invoice. No signature required.",
    20,
    y
  );
  doc.setFont("helvetica", "normal");

  // ===========================
  // Save PDF
  // ===========================
  doc.save(
    `Invoice-${order._id
      .slice(-6)
      .toUpperCase()}.pdf`
  );
};

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-5xl font-bold text-center mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl">
          No orders found.
        </h2>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>

              <p className="mt-2 flex items-center gap-2">
                <strong>Status:</strong>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
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
                  {order.status}
                </span>
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>

              <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.shippingAddress}
              </p>

              <p>
                <strong>Phone:</strong> {order.phone}
              </p>

              <p>
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod}
              </p>

              <p className="mt-2 flex items-center gap-2">
                <strong>Payment Status:</strong>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>

              {order.transactionId && (
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {order.transactionId}
                </p>
              )}

              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">
                  Products
                </h3>

                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b py-2"
                  >
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.title}
                      className="w-20 h-20 object-contain rounded-lg border bg-white p-1"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80?text=No+Image";
                      }}
                    />

                    <div>
                      <p className="font-bold">
                        {product.title}
                      </p>

                      <p className="text-blue-600 font-semibold">
                        ₹{product.price}
                     </p>

                      <p>
                        Quantity: {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => downloadInvoice(order)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                >
                  📄 Download Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;