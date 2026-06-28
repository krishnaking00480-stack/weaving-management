const Loom = require("../models/Loom");

// ===============================
// CREATE LOOM
// ===============================
const createLoom = async (req, res) => {
  try {
    const loom = await Loom.create(req.body);

    res.status(201).json({
      success: true,
      message: "Loom created successfully",
      data: loom,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// GET ALL LOOMS
// ===============================
const getLooms = async (req, res) => {
  try {

    const looms = await Loom.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: looms.length,
      data: looms,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// GET SINGLE LOOM
// ===============================
const getLoomById = async (req, res) => {
  try {

    const loom = await Loom.findById(req.params.id);

    if (!loom) {
      return res.status(404).json({
        success: false,
        message: "Loom not found",
      });
    }

    res.status(200).json({
      success: true,
      data: loom,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// UPDATE LOOM
// ===============================
const updateLoom = async (req, res) => {
  try {

    const loom = await Loom.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!loom) {
      return res.status(404).json({
        success: false,
        message: "Loom not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Loom updated successfully",
      data: loom,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// DELETE LOOM
// ===============================
const deleteLoom = async (req, res) => {
  try {

    const loom = await Loom.findByIdAndDelete(req.params.id);

    if (!loom) {
      return res.status(404).json({
        success: false,
        message: "Loom not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Loom deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// LOOM STATISTICS
// ===============================
const getLoomStats = async (req, res) => {
  try {

    const total = await Loom.countDocuments();

    const running = await Loom.countDocuments({
      status: "Running",
    });

    const pending = await Loom.countDocuments({
      status: "Pending",
    });

    const completed = await Loom.countDocuments({
      status: "Completed",
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        running,
        pending,
        completed,
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
  createLoom,
  getLooms,
  getLoomById,
  updateLoom,
  deleteLoom,
  getLoomStats,
};