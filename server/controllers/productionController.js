const Production = require("../models/Production");

// ===============================
// CREATE PRODUCTION
// ===============================
const createProduction = async (req, res) => {
  try {
    const production = await Production.create(req.body);

    res.status(201).json({
      success: true,
      message: "Production created successfully",
      data: production,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL PRODUCTIONS
// ===============================
const getProductions = async (req, res) => {
  try {
    const productions = await Production.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: productions.length,
      data: productions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE PRODUCTION
// ===============================
const getProductionById = async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);

    if (!production) {
      return res.status(404).json({
        success: false,
        message: "Production not found",
      });
    }

    res.status(200).json({
      success: true,
      data: production,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE PRODUCTION
// ===============================
const updateProduction = async (req, res) => {
  try {
    const production = await Production.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!production) {
      return res.status(404).json({
        success: false,
        message: "Production not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Production updated successfully",
      data: production,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE PRODUCTION
// ===============================
const deleteProduction = async (req, res) => {
  try {
    const production = await Production.findByIdAndDelete(
      req.params.id
    );

    if (!production) {
      return res.status(404).json({
        success: false,
        message: "Production not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Production deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// PRODUCTION STATISTICS
// ===============================
const getProductionStats = async (req, res) => {
  try {
    const total = await Production.countDocuments();

    const running = await Production.countDocuments({
      status: "Running",
    });

    const completed = await Production.countDocuments({
      status: "Completed",
    });

    const onHold = await Production.countDocuments({
      status: "On Hold",
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        running,
        completed,
        onHold,
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
  createProduction,
  getProductions,
  getProductionById,
  updateProduction,
  deleteProduction,
  getProductionStats,
};