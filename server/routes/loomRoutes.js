const express = require("express");

const router = express.Router();

const {
  createLoom,
  getLooms,
  getLoomById,
  updateLoom,
  deleteLoom,
  getLoomStats,
} = require("../controllers/loomController");

// ===============================
// STATISTICS
// ===============================
router.get("/stats", getLoomStats);

// ===============================
// CREATE LOOM
// ===============================
router.post("/", createLoom);

// ===============================
// GET ALL LOOMS
// ===============================
router.get("/", getLooms);

// ===============================
// GET SINGLE LOOM
// ===============================
router.get("/:id", getLoomById);

// ===============================
// UPDATE LOOM
// ===============================
router.put("/:id", updateLoom);

// ===============================
// DELETE LOOM
// ===============================
router.delete("/:id", deleteLoom);

module.exports = router;