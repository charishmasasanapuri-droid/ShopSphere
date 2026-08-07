import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowProduct = location.state?.buyNowProduct;

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      // Demo Online Payment
      if (paymentMethod === "Online Payment") {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        alert("✅ Payment Successful!");
      }

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          shippingAddress: address,
          phone,
          paymentMethod,
          buyNowProduct,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      alert("🎉 Order Placed Successfully!");

      navigate("/orders");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-10 w-[550px]">
        <h1 className="text-4xl font-bold text-center mb-8">
          Checkout
        </h1>

        {buyNowProduct && (
          <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">
              Product Summary
            </h2>

            <img
              src={`http://localhost:5000${buyNowProduct.image}`}
              alt={buyNowProduct.name}
              className="w-40 h-40 object-contain mx-auto"
            />

            <h3 className="text-xl font-semibold mt-4 text-center">
              {buyNowProduct.name}
            </h3>

            <p className="text-center text-gray-600">
              {buyNowProduct.category}
            </p>

            <p className="text-center text-2xl text-blue-600 font-bold mt-2">
              ₹{buyNowProduct.price}
            </p>
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        />

        <div className="mb-6">
          <h3 className="font-semibold mb-3">
            Select Payment Method
          </h3>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Online Payment"
              checked={paymentMethod === "Online Payment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment (Demo)
          </label>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:bg-gray-500"
        >
          {loading ? "Processing Payment..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;