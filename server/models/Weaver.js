const mongoose = require("mongoose");

const weaverSchema = new mongoose.Schema(
  {
    weaverId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    weaverName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Reference to Loom
    assignedLoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loom",
      default: null,
    },

    experience: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Leave"],
      default: "Active",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Weaver", weaverSchema);