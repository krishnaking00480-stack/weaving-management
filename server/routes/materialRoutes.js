const express = require("express");

const router = express.Router();

const {
  createMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  getMaterialStats,
} = require("../controllers/materialController");

// ===============================
// MATERIAL STATISTICS
// ===============================
router.get("/stats", getMaterialStats);

// ===============================
// CREATE MATERIAL
// ===============================
router.post("/", createMaterial);

// ===============================
// GET ALL MATERIALS
// ===============================
router.get("/", getMaterials);

// ===============================
// GET SINGLE MATERIAL
// ===============================
router.get("/:id", getMaterialById);

// ===============================
// UPDATE MATERIAL
// ===============================
router.put("/:id", updateMaterial);

// ===============================
// DELETE MATERIAL
// ===============================
router.delete("/:id", deleteMaterial);

module.exports = router;