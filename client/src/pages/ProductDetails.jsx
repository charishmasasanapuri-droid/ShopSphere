import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FaShareAlt } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `https://shopsphere-l2ul.onrender.com/api/products/${id}`
      );

      setProduct(response.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = () => {
  if (product.stock === 0) {
    alert("This product is out of stock.");
    return;
  }

  dispatch(addToCart(product));
  alert("Product added to cart!");
};

const handleBuyNow = () => {
  if (product.stock === 0) {
    alert("This product is out of stock.");
    return;
  }

  navigate("/checkout", {
    state: {
      buyNowProduct: product,
    },
  });
};

const handleShare = async () => {
  const productUrl = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
  title: product.name,
  text: `Check out "${product.name}" for only ₹${product.price}!`,
  url: productUrl,
});
    } catch (error) {
      console.log("Share cancelled");
    }
  } else {
    await navigator.clipboard.writeText(productUrl);
    alert("Product link copied to clipboard!");
  }
};

const handleReviewSubmit = async () => {
  if (!user || !comment) {
    alert("Please fill all fields.");
    return;
  }


  try {
    const response = await axios.post(
      `https://shopsphere-l2ul.onrender.com/api/products/${id}/review`,
      {
        user,
        rating,
        comment,
      }
    );

    setProduct(response.data.product);

    setUser("");
    setRating(5);
    setComment("");

    alert("Review added successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to add review.");
  }
};

  if (!product) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <Link
        to="/products"
        className="text-blue-600 font-semibold"
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-8">
        <img
          src={`https://shopsphere-l2ul.onrender.com${product.image}`}
          alt={product.name}
          className="w-full h-96 object-contain"
        />

        <div>
          <span className="bg-red-600 text-white px-4 py-2 rounded-full">
            {product.discount}
          </span>

          <h1 className="text-5xl font-bold mt-6">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-3">
            Category: {product.category}
          </p>

          <p className="text-4xl text-blue-600 font-bold mt-5">
            ₹{product.price}
          </p>

          <p className="mt-4 font-medium">
            Stock: {product.stock}
          </p>

          <p
  className={`font-bold mt-2 ${
    product.stock > 0 ? "text-green-600" : "text-red-600"
  }`}
>
  {product.stock > 0 ? "In Stock" : "Out of Stock"}
</p>

          <div className="text-yellow-500 text-2xl mt-5">
            ⭐⭐⭐⭐⭐
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">
              Description
            </h2>

            <p className="text-gray-700 leading-7">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4 mt-8 flex-wrap">

  <button
  onClick={handleAddToCart}
  disabled={product.stock === 0}
  className={`px-8 py-3 rounded-lg text-white ${
    product.stock === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  Add to Cart
</button>

  <button
  onClick={handleBuyNow}
  disabled={product.stock === 0}
  className={`px-8 py-3 rounded-lg text-white ${
    product.stock === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  Buy Now
</button>

  <button
    onClick={handleShare}
    className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 flex items-center gap-2"
  >
    <FaShareAlt />
    Share
  </button>

</div>

          {/* Review Form */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Write a Review
            </h2>

            <input
              type="text"
              placeholder="Your Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            />

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
              rows="4"
            />

            <button
              onClick={handleReviewSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit Review
            </button>
          </div>

          {/* Customer Reviews */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Customer Reviews
            </h2>

            {product.reviews && product.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              product.reviews &&
              product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border rounded p-4 mb-4"
                >
                  <h3 className="font-bold">
                    {review.user}
                  </h3>

                  <p className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </p>

                  <p>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;