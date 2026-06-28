const express = require("express");
const cors = require("cors");

const loginRoutes = require("./routes/loginRoutes");
const loomRoutes = require("./routes/loomRoutes");
const weaverRoutes = require("./routes/weaverRoutes");
const materialRoutes = require("./routes/materialRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const productionRoutes = require("./routes/productionRoutes");
const salesRoutes = require("./routes/salesRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// API ROUTES
// ===============================

// Login
app.use("/api", loginRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Loom Management
app.use("/api/looms", loomRoutes);

// Weaver Management
app.use("/api/weavers", weaverRoutes);

// Material Management
app.use("/api/materials", materialRoutes);

// Purchase Management
app.use("/api/purchases", purchaseRoutes);

// Production Management
app.use("/api/productions", productionRoutes);

// Sales Management
app.use("/api/sales", salesRoutes);

// ===============================
// HOME ROUTE
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Weaving Management System API Running Successfully",
  });
});

// ===============================
// INVALID ROUTE
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

module.exports = app;