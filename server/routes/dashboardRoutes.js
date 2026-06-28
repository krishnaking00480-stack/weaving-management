const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

// ======================================
// DASHBOARD STATISTICS
// ======================================
router.get("/", getDashboardStats);

// ======================================
// EXPORT
// ======================================
module.exports = router;