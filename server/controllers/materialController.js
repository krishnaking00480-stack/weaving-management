const Material = require("../models/Material");

// ===============================
// CREATE MATERIAL
// ===============================
const createMaterial = async (req, res) => {
  try {
    const material = await Material.create(req.body);

    res.status(201).json({
      success: true,
      message: "Material details saved successfully",
      data: material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL MATERIALS
// ===============================
const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE MATERIAL
// ===============================
const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE MATERIAL
// ===============================
const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Material updated successfully",
      data: material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE MATERIAL
// ===============================
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Material deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// MATERIAL STATISTICS
// ===============================
const getMaterialStats = async (req, res) => {
  try {
    const totalLooms = await Material.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalLooms,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// EXPORTS
// ===============================
module.exports = {
  createMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  getMaterialStats,
};