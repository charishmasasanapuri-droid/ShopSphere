import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold text-center mb-10">
        ❤️ Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-xl">
            Your wishlist is empty.
          </p>

          <Link to="/products">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-pink-700">
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-5 border text-center"
            >
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className="w-40 h-40 object-contain mx-auto"
              />

              <h2 className="text-xl font-bold mt-3">
                {item.name}
              </h2>

              <p className="text-blue-600 text-2xl font-bold mt-2">
                ₹{item.price}
              </p>

              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;