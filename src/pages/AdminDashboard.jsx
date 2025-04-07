import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { leadsApi } from "../api/leadsApi";
import { toast } from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import RecentCallsTable from "../components/leads/RecentCallsTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalTelecallers: 0,
    totalCalls: 0,
    totalCustomers: 0,
    recentCalls: [],
    callTrends: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await leadsApi.getLeadStats();
      setStats(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const chartData = {
    labels: stats.callTrends.map((trend) => trend._id),
    datasets: [
      {
        label: "Calls per day",
        data: stats.callTrends.map((trend) => trend.count),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Call Trends (Last 7 Days)",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              Welcome, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Telecallers
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.totalTelecallers}
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Calls Made
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.totalCalls}
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Customers Contacted
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.totalCustomers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Call Trends
            </h2>
            <div className="h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Calls
            </h2>
            <RecentCallsTable calls={stats.recentCalls} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
