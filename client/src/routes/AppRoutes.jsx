import { Routes, Route } from "react-router-dom";

import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLogin from "../pages/AdminLogin";
import Admin from "../pages/Admin";
import AdminOrders from "../pages/AdminOrders";
import AdminUsers from "../pages/AdminUsers";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route
  path="/products/:id"
  element={<ProductDetails />}
/>
  <Route path="/admin/login" element={<AdminLogin />} />

      <Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <Admin />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminProtectedRoute>
      <AdminOrders />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <AdminUsers />
    </AdminProtectedRoute>
  }
/>

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default AppRoutes;