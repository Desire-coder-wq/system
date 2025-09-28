const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/vendor_dashboard")
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch(err => console.log(err));


  // Set view engine to Pug
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));


// Routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
