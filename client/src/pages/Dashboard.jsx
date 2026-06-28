import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import DashboardCards from "../components/dashboard/DashboardCards";
import QuickActions from "../components/dashboard/QuickActions";
import ProductionChart from "../components/dashboard/ProductionChart";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentActivities from "../components/dashboard/RecentActivities";
import Notifications from "../components/dashboard/Notifications";

import api from "../services/api";

function Dashboard() {
  // ==========================
  // Dashboard Statistics
  // ==========================
  const [stats, setStats] = useState({
    totalLooms: 0,
    workingLooms: 0,
    idleLooms: 0,

    totalWeavers: 0,
    activeWeavers: 0,
    inactiveWeavers: 0,

    totalMaterials: 0,

    totalPurchases: 0,

    totalProductions: 0,
    completedProductions: 0,
    pendingProductions: 0,

    totalSales: 0,
    pendingSales: 0,
    completedSales: 0,

    totalRevenue: 0,
  });

  // ==========================
  // Fetch Dashboard Data
  // ==========================
  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setStats(response.data.data);
    } catch (error) {
      console.error("Dashboard Error :", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">

        {/* Navbar */}
        <Navbar />

        <div className="p-6">

          {/* Welcome */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

            <h1 className="text-3xl font-bold text-blue-700">
              👋 Welcome, Ram
            </h1>

            <p className="text-gray-500 mt-2">
              Weaving Management ERP Dashboard
            </p>

            <p className="text-gray-400 text-sm mt-1">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

          </div>

          {/* Dashboard Cards */}
          <DashboardCards stats={stats} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6 mt-8">

            <ProductionChart />

            <RevenueChart />

          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-6 mt-8">

            <RecentActivities />

            <Notifications />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;