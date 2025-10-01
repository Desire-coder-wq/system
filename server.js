const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const multer = require("multer")

const Product = require("./models/Product");
const productRoutes = require("./routes/products");
// ================== VIEW ENGINE ==================
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ================== MIDDLEWARE ==================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // Product images

// ================== DATABASE ==================
mongoose
  .connect("mongodb://127.0.0.1:27017/vendor_dashboard")
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ====== ROUTES ======
app.use("/", productRoutes);


// ================== SERVER ==================
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
