const mongoose = require("mongoose");

const productionSchema = new mongoose.Schema(
  {
    // ==========================
    // Loom Details
    // ==========================
    loomId: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // Weaver Details
    // ==========================
    weaverName: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // Saree Details
    // ==========================
    sareeName: {
      type: String,
      required: true,
      trim: true,
    },

    design: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    // ==========================
    // Dates
    // ==========================
    startDate: {
      type: Date,
      required: true,
    },

    expectedEndDate: {
      type: Date,
      required: true,
    },

    completedDate: {
      type: Date,
      default: null,
    },

    // ==========================
    // Status
    // ==========================
    status: {
      type: String,
      enum: [
        "Running",
        "Completed",
        "On Hold",
      ],
      default: "Running",
    },

    // ==========================
    // Notes
    // ==========================
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Production",
  productionSchema
);