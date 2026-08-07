import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h1 className="text-5xl font-bold">
        Welcome to ShopSphere 🛒
      </h1>

      <p className="mt-4 text-xl">
        Your One-Stop Online Shopping Destination
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Shop Now
      </button>
    </div>
  );
}

export default Home;