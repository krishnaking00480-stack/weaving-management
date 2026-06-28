const Weaver = require("../models/Weaver");

// ======================================
// CREATE WEAVER
// ======================================
const createWeaver = async (req, res) => {
  try {
    const weaver = await Weaver.create(req.body);

    res.status(201).json({
      success: true,
      message: "Weaver created successfully",
      data: weaver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ALL WEAVERS
// ======================================
const getWeavers = async (req, res) => {
  try {
    const weavers = await Weaver.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: weavers.length,
      data: weavers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE WEAVER
// ======================================
const getWeaverById = async (req, res) => {
  try {
    const weaver = await Weaver.findById(req.params.id);

    if (!weaver) {
      return res.status(404).json({
        success: false,
        message: "Weaver not found",
      });
    }

    res.status(200).json({
      success: true,
      data: weaver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE WEAVER
// ======================================
const updateWeaver = async (req, res) => {
  try {
    const weaver = await Weaver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!weaver) {
      return res.status(404).json({
        success: false,
        message: "Weaver not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Weaver updated successfully",
      data: weaver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE WEAVER
// ======================================
const deleteWeaver = async (req, res) => {
  try {
    const weaver = await Weaver.findByIdAndDelete(req.params.id);

    if (!weaver) {
      return res.status(404).json({
        success: false,
        message: "Weaver not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Weaver deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// WEAVER STATISTICS
// ======================================
const getWeaverStats = async (req, res) => {
  try {
    const total = await Weaver.countDocuments();

    const active = await Weaver.countDocuments({
      status: "Active",
    });

    const inactive = await Weaver.countDocuments({
      status: "Inactive",
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        inactive,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// EXPORTS
// ======================================
module.exports = {
  createWeaver,
  getWeavers,
  getWeaverById,
  updateWeaver,
  deleteWeaver,
  getWeaverStats,
};