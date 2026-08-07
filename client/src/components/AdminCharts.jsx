import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminCharts({ stats }) {
  const barData = {
    labels: ["Products", "Orders", "Users"],
    datasets: [
      {
        label: "Count",
        data: [
          stats.totalProducts,
          stats.totalOrders,
          stats.totalUsers,
        ],
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#EAB308",
        ],
      },
    ],
  };

  const revenueData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Revenue",
        data: [stats.totalRevenue],
        backgroundColor: ["#EF4444"],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Orders Overview
        </h2>

        <Bar data={barData} />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Revenue Overview
        </h2>

        <Doughnut data={revenueData} />
      </div>
    </div>
  );
}

export default AdminCharts;