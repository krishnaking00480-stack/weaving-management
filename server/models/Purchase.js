const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    // Loom
    loomId: {
      type: String,
      required: true,
      trim: true,
    },

    // Material Required
    materialName: {
      type: String,
      enum: [
        "Thaadai",
        "Thaadai Pirikurathu",
        "Udal Pattu",
        "Karai Pattu",
        "Selpu Pattu",
        "Selpu Jarigai",
        "Pettu Jarigai",
      ],
      required: true,
    },

    // Quantity in Grams
    requiredQuantity: {
      type: Number,
      required: true,
      default: 0,
    },

    // Supplier Name
    supplier: {
      type: String,
      required: true,
      trim: true,
    },

    // Purchase Status
    status: {
      type: String,
      enum: ["Pending", "Ordered", "Received"],
      default: "Pending",
    },

    // Purchase Date
    purchaseDate: {
      type: Date,
      default: Date.now,
    },

    // Notes
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Purchase", purchaseSchema);