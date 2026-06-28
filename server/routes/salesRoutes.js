const express = require("express");

const router = express.Router();

const {
  createSales,
  getSales,
  getSalesById,
  updateSales,
  deleteSales,
  getSalesStats,
} = require("../controllers/salesController");

// ===============================
// SALES ROUTES
// ===============================

// Statistics
router.get("/stats", getSalesStats);

// Get All Sales
router.get("/", getSales);

// Get Single Sales
router.get("/:id", getSalesById);

// Create Sales
router.post("/", createSales);

// Update Sales
router.put("/:id", updateSales);

// Delete Sales
router.delete("/:id", deleteSales);

module.exports = router;