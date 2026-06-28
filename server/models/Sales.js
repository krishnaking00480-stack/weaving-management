const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    // ==========================
    // Production Details
    // ==========================
    productionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Production",
    },

    loomId: {
      type: String,
      required: true,
    },

    weaverName: {
      type: String,
      required: true,
    },

    sareeName: {
      type: String,
      required: true,
    },

    // ==========================
    // Received Status
    // ==========================
    receivedStatus: {
      type: String,
      enum: ["Pending", "Received"],
      default: "Pending",
    },

    // ==========================
    // Quality Check
    // ==========================
    quality: {
      type: String,
      enum: [
        "Good",
        "Minor Defect",
        "Major Defect",
      ],
      default: "Good",
    },

    problemDetails: {
      type: String,
      default: "",
    },

    // ==========================
    // Saree Details
    // ==========================
    sareeWeight: {
      type: Number,
      required: true,
      default: 0,
    },

    saleRate: {
      type: Number,
      required: true,
      default: 0,
    },

    // ==========================
    // Labour
    // ==========================
    labourStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    labourAmount: {
      type: Number,
      default: 0,
    },

    // ==========================
    // Dates
    // ==========================
    receivedDate: {
      type: Date,
      required: true,
    },

    // ==========================
    // Remarks
    // ==========================
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sales", salesSchema);