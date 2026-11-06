import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();
  const [dbCartItems, setDbCartItems] = useState([]);
  useEffect(() => {
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://shopsphere-l2ul.onrender.com/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDbCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCart();
}, []);
const handleRemove = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`https://shopsphere-l2ul.onrender.com/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update UI after deleting
    setDbCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  } catch (error) {
    console.error(error);
    alert("Failed to remove product.");
  }
};

 const totalItems = dbCartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

const totalPrice = dbCartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold text-center mb-10">
        Your Cart
      </h1>

     {dbCartItems.length === 0 ? (
        <h2 className="text-center text-2xl">
          Your cart is empty.
        </h2>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {dbCartItems.map((item) => (
            <div
  key={item._id}
  className="border rounded-lg p-5 shadow"
>
  <img
    src={`https://shopsphere-l2ul.onrender.com${item.image}`}
    alt={item.title}
    className="w-32 h-32 object-cover mx-auto"
    onError={(e) => {
      e.target.src = "https://via.placeholder.com/128?text=No+Image";
    }}
  />

  <h2 className="text-2xl font-bold mt-4">
    {item.title}
  </h2>

  <p className="text-blue-600 text-xl">
    ₹{item.price}
  </p>

  <p className="text-lg mt-2">
    Quantity: <strong>{item.quantity}</strong>
  </p>

  <button
    onClick={() => handleRemove(item._id)}
    className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
  >
    Remove
  </button>
</div>
          ))}
        </div>
           )}

     {dbCartItems.length > 0 && (
        <div className="mt-10 border-t pt-6 text-center">
          <h2 className="text-2xl font-bold">
            Cart Summary
          </h2>

          <p className="text-xl mt-2">
            Total Items: <strong>{totalItems}</strong>
          </p>

          <p className="text-xl mt-2 text-green-600 font-bold">
            Total Price: ₹{totalPrice}
          </p>

          <button
          onClick={() => navigate("/checkout")}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;