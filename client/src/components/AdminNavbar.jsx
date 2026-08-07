import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-8">
      <div className="flex justify-center gap-6">

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `px-5 py-2 rounded-lg font-semibold ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `px-5 py-2 rounded-lg font-semibold ${
              isActive
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `px-5 py-2 rounded-lg font-semibold ${
              isActive
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`
          }
        >
          Users
        </NavLink>

      </div>
    </div>
  );
}

export default AdminNavbar;