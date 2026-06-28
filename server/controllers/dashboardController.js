const Loom = require("../models/Loom");
const Weaver = require("../models/Weaver");
const Material = require("../models/Material");
const Purchase = require("../models/Purchase");
const Production = require("../models/Production");
const Sales = require("../models/Sales");

// ======================================
// GET DASHBOARD STATISTICS
// ======================================
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalLooms,
      workingLooms,
      idleLooms,

      totalWeavers,
      activeWeavers,
      inactiveWeavers,

      totalMaterials,

      totalPurchases,

      totalProductions,
      completedProductions,
      pendingProductions,

      totalSales,
      pendingSales,
      completedSales,

      sales,
    ] = await Promise.all([
      // Loom
      Loom.countDocuments(),
      Loom.countDocuments({ status: "Working" }),
      Loom.countDocuments({ status: "Idle" }),

      // Weaver
      Weaver.countDocuments(),
      Weaver.countDocuments({ status: "Active" }),
      Weaver.countDocuments({ status: "Inactive" }),

      // Material
      Material.countDocuments(),

      // Purchase
      Purchase.countDocuments(),

      // Production
      Production.countDocuments(),
      Production.countDocuments({ status: "Completed" }),
      Production.countDocuments({ status: "Pending" }),

      // Sales
      Sales.countDocuments(),
      Sales.countDocuments({ receivedStatus: "Pending" }),
      Sales.countDocuments({ receivedStatus: "Received" }),

      // Revenue
      Sales.find(),
    ]);

    // ==========================
    // Total Revenue
    // ==========================
    const totalRevenue = sales.reduce(
      (sum, sale) => sum + Number(sale.saleRate || 0),
      0
    );

    // ==========================
    // Response
    // ==========================
    res.status(200).json({
      success: true,
      data: {
        // Loom
        totalLooms,
        workingLooms,
        idleLooms,

        // Weaver
        totalWeavers,
        activeWeavers,
        inactiveWeavers,

        // Material
        totalMaterials,

        // Purchase
        totalPurchases,

        // Production
        totalProductions,
        completedProductions,
        pendingProductions,

        // Sales
        totalSales,
        pendingSales,
        completedSales,

        // Revenue
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

// ======================================
// EXPORT
// ======================================
module.exports = {
  getDashboardStats,
};