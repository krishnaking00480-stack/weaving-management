const Sales = require("../models/Sales");

// ===============================
// CREATE SALES
// ===============================
const createSales = async (req, res) => {
  try {
    const sales = await Sales.create(req.body);

    res.status(201).json({
      success: true,
      message: "Sales record created successfully",
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL SALES
// ===============================
const getSales = async (req, res) => {
  try {
    const sales = await Sales.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE SALES
// ===============================
const getSalesById = async (req, res) => {
  try {
    const sales = await Sales.findById(req.params.id);

    if (!sales) {
      return res.status(404).json({
        success: false,
        message: "Sales record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE SALES
// ===============================
const updateSales = async (req, res) => {
  try {
    const sales = await Sales.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!sales) {
      return res.status(404).json({
        success: false,
        message: "Sales record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sales updated successfully",
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE SALES
// ===============================
const deleteSales = async (req, res) => {
  try {
    const sales = await Sales.findByIdAndDelete(req.params.id);

    if (!sales) {
      return res.status(404).json({
        success: false,
        message: "Sales record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sales deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// SALES STATISTICS
// ===============================
const getSalesStats = async (req, res) => {
  try {
    const totalSales = await Sales.countDocuments();

    const received = await Sales.countDocuments({
      receivedStatus: "Received",
    });

    const pending = await Sales.countDocuments({
      receivedStatus: "Pending",
    });

    const good = await Sales.countDocuments({
      quality: "Good",
    });

    const minor = await Sales.countDocuments({
      quality: "Minor Defect",
    });

    const major = await Sales.countDocuments({
      quality: "Major Defect",
    });

    const labourPending = await Sales.countDocuments({
      labourStatus: "Pending",
    });

    const labourPaid = await Sales.countDocuments({
      labourStatus: "Paid",
    });

    const sales = await Sales.find();

    const totalRevenue = sales.reduce(
      (sum, item) => sum + item.saleRate,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        totalSales,
        received,
        pending,
        good,
        minor,
        major,
        labourPending,
        labourPaid,
        totalRevenue,
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
  createSales,
  getSales,
  getSalesById,
  updateSales,
  deleteSales,
  getSalesStats,
};