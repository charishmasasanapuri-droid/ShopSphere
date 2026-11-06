import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";
import { Link } from "react-router-dom";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

function ProductCard({
  id,
  name,
  price,
  image,
  category,
  discount,
}) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [showShare, setShowShare] = useState(false);

  const isWishlisted = wishlistItems.some(
    (item) => item.id === id
  );

  // Add to Cart
  const handleAddToCart = async () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        image,
      })
    );

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://shopsphere-l2ul.onrender.com/api/cart/add",
        {
          productId: id,
          title: name,
          price,
          image,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart successfully!");
    } catch (error) {
      console.log("Full Error:", error);

      if (error.response) {
        console.log("Backend Response:", error.response.data);
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 border text-center">

      {/* Discount Badge */}
      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
        {discount}
      </div>

      {/* Wishlist Heart */}
      <button
        onClick={() => {
          if (isWishlisted) {
            dispatch(removeFromWishlist(id));
          } else {
            dispatch(
              addToWishlist({
                id,
                name,
                price,
                image,
                category,
              })
            );
          }
        }}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-all duration-300"
      >
        <FaHeart
          className={`text-lg ${
            isWishlisted ? "text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Product Image */}
      <Link to={`/products/${id}`}>
        <img
          src={`https://shopsphere-l2ul.onrender.com${image}`}
          alt={name}
          className="w-40 h-40 object-contain mx-auto cursor-pointer"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/160?text=No+Image";
          }}
        />
      </Link>

      {/* Category */}
      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mt-3">
        {category}
      </span>

      {/* Product Name */}
      <h2 className="text-xl font-bold mt-3">
        {name}
      </h2>

      {/* Rating */}
      <div className="text-yellow-500 text-lg mt-2">
        ⭐⭐⭐⭐⭐
      </div>

      {/* Price */}
      <p className="text-blue-600 text-2xl font-bold mt-2">
        ₹{price}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2">

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300"
        >
          Add to Cart
        </button>

        <button
  onClick={() => setShowShare(!showShare)}
  className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
>
  <FaShareAlt />
  Share
</button>

{showShare && (
  <div className="mt-3 bg-white border rounded-lg shadow-lg p-4">

    <h3 className="font-semibold mb-3 text-center">
      Share Product
    </h3>

    <div className="flex justify-center gap-3 flex-wrap">

      <WhatsappShareButton
        url={`${window.location.origin}/products/${id}`}
        title={name}
      >
        <WhatsappIcon size={45} round />
      </WhatsappShareButton>

      <FacebookShareButton
        url={`${window.location.origin}/products/${id}`}
      >
        <FacebookIcon size={45} round />
      </FacebookShareButton>

      <TelegramShareButton
        url={`${window.location.origin}/products/${id}`}
        title={name}
      >
        <TelegramIcon size={45} round />
      </TelegramShareButton>

      <TwitterShareButton
        url={`${window.location.origin}/products/${id}`}
        title={name}
      >
        <TwitterIcon size={45} round />
      </TwitterShareButton>

      <EmailShareButton
        url={`${window.location.origin}/products/${id}`}
        subject={name}
      >
        <EmailIcon size={45} round />
      </EmailShareButton>

    </div>

    <button
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/products/${id}`
        );
        alert("Product link copied!");
      }}
      className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
    >
      Copy Link
    </button>

  </div>
)}

      </div>

    </div>
  );
}

export default ProductCard;