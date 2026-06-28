const mongoose = require("mongoose");

const loomSchema = new mongoose.Schema(
  {
    loomId: {
      type: String,
      required: true,
      unique: true,
    },

    weaverName: {
      type: String,
      required: true,
    },

    sareeType: {
      type: String,
      required: true,
    },

    ariCount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Running", "Pending", "Completed"],
      default: "Running",
    },

    startDate: {
      type: Date,
    },

    expectedDate: {
      type: Date,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loom", loomSchema);