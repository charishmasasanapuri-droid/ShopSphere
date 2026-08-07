import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
     <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          to="/"
         className="text-xl font-bold flex items-center gap-3 whitespace-nowrap"
        >
          🛒 ShopSphere
        </Link>

   <div className="flex flex-wrap items-center justify-end gap-3 text-lg font-medium flex-1 ml-6">
          <Link
  to="/"
  className="hover:text-yellow-300 whitespace-nowrap"
>
  Home
</Link>

<Link
  to="/products"
  className="hover:text-yellow-300 whitespace-nowrap"
>
  Products
</Link>

         <Link
  to="/cart"
  className="hover:text-yellow-300 whitespace-nowrap"
>
  🛒 Cart ({cartItems.length})
</Link>

          <Link
  to="/orders"
  className="hover:text-yellow-300 whitespace-nowrap"
>
  Orders
</Link>

         <Link
  to="/wishlist"
  className="hover:text-yellow-300 flex items-center gap-3 whitespace-nowrap"
>
  <span>❤️</span>
  <span>Wishlist ({wishlistItems.length})</span>
</Link>
          {user ? (
  <>
    <span className="text-yellow-300 font-semibold whitespace-nowrap">
 Hi, {user.name.split(" ")[0]} 👋
</span>

  <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  }}
  className="hover:text-red-300 whitespace-nowrap"
>
  Logout
</button>
  </>
) : (
  <>
    <Link
  to="/login"
  className="hover:text-yellow-300 whitespace-nowrap"
>
  Login
</Link>

<Link
  to="/register"
  className="hover:text-yellow-300 whitespace-nowrap"
>
  Register
</Link>
  </>
)}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;