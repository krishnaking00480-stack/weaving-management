const express = require("express");

const router = express.Router();

const {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  getPurchaseStats,
} = require("../controllers/purchaseController");

// ===============================
// PURCHASE STATISTICS
// ===============================
router.get("/stats", getPurchaseStats);

// ===============================
// CREATE PURCHASE
// ===============================
router.post("/", createPurchase);

// ===============================
// GET ALL PURCHASES
// ===============================
router.get("/", getPurchases);

// ===============================
// GET SINGLE PURCHASE
// ===============================
router.get("/:id", getPurchaseById);

// ===============================
// UPDATE PURCHASE
// ===============================
router.put("/:id", updatePurchase);

// ===============================
// DELETE PURCHASE
// ===============================
router.delete("/:id", deletePurchase);

module.exports = router;