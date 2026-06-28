const express = require("express");

const router = express.Router();

const {
  createProduction,
  getProductions,
  getProductionById,
  updateProduction,
  deleteProduction,
  getProductionStats,
} = require("../controllers/productionController");

// ===============================
// PRODUCTION ROUTES
// ===============================

// Statistics
router.get("/stats", getProductionStats);

// Get All Productions
router.get("/", getProductions);

// Get Single Production
router.get("/:id", getProductionById);

// Create Production
router.post("/", createProduction);

// Update Production
router.put("/:id", updateProduction);

// Delete Production
router.delete("/:id", deleteProduction);

module.exports = router;