const express = require("express");

const router = express.Router();

const {
  createWeaver,
  getWeavers,
  getWeaverById,
  updateWeaver,
  deleteWeaver,
  getWeaverStats,
} = require("../controllers/weaverController");

// ===============================
// WEAVER STATISTICS
// ===============================
router.get("/stats", getWeaverStats);

// ===============================
// CREATE WEAVER
// ===============================
router.post("/", createWeaver);

// ===============================
// GET ALL WEAVERS
// ===============================
router.get("/", getWeavers);

// ===============================
// GET SINGLE WEAVER
// ===============================
router.get("/:id", getWeaverById);

// ===============================
// UPDATE WEAVER
// ===============================
router.put("/:id", updateWeaver);

// ===============================
// DELETE WEAVER
// ===============================
router.delete("/:id", deleteWeaver);

module.exports = router;