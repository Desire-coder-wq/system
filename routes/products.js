const express = require("express");
const Product = require("../models/Product");
const upload = require("../middleware/upload");

const router = express.Router();

// GET Dashboard
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });

    const stats = {
      totalSales: 50000000,
      totalOrders: 15000000,
      inStock: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
      outOfStock: 5
    };

    res.render("vendor-dashboard", {
      products,
      stats,
      success: null,
      error: null,
      validationErrors: {},
      formData: {}
    });
  } catch (err) {
    res.render("vendor-dashboard", {
      products: [],
      stats: { totalSales: 50000000, totalOrders: 15000000, inStock: 0, outOfStock: 5},
      success: null,
      error: "Failed to fetch products",
      validationErrors: {},
      formData: {}
    });
  }
});

// POST Add Product
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, quantity, color } = req.body;
    const validationErrors = {};

    // Field validation
    if (!name) validationErrors.name = "Invalid field";
    if (!category) validationErrors.category = "Invalid field";
    if (!price || isNaN(price) || price <= 0) validationErrors.price = "Invalid field";
    if (!quantity || isNaN(quantity) || quantity < 0) validationErrors.quantity = "Invalid field";
    if (!color) validationErrors.color = "Invalid field";
    if (!req.file) validationErrors.image = "Invalid field";

    if (Object.keys(validationErrors).length > 0) {
      const products = await Product.find().sort({ createdAt: 1 });
      const stats = {
        totalSales: 50000000,
        totalOrders: 15000000,
        inStock: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
        outOfStock: products.filter(p => p.quantity === 0).length
      };

      return res.render("vendor-dashboard", {
        products,
        stats,
        success: null,
        error: "Please fix the validation errors",
        validationErrors,
        formData: req.body
      });
    }

    // Generate sequential productId
    const latest = await Product.findOne().sort({ createdAt: -1 });
    let newProductId = "#645341";
    if (latest && latest.productId) {
      const lastId = parseInt(latest.productId.replace("#", ""));
      newProductId = "#" + (lastId + 1);
    }

    // Save product
    const product = new Product({
      productId: newProductId,
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity),
      color: color.trim(),
      image: "/uploads/" + req.file.filename
    });

    await product.save();

    // Refresh products list
    const products = await Product.find().sort({ createdAt: 1 });
    const stats = {
      totalSales: 50000000,
      totalOrders: 15000000,
      inStock: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
      outOfStock: 5
    };

    res.render("vendor-dashboard", {
      products,
      stats,
      success: "Product has been added successfully!",
      error: null,
      validationErrors: {},
      formData: {}
    });
  } catch (err) {
    const products = await Product.find().sort({ createdAt: 1 });
    const stats = {
      totalSales: 50000000,
      totalOrders: 15000000,
      inStock: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
      outOfStock: 5
    };

    res.render("vendor-dashboard", {
      products,
      stats,
      success: null,
      error: err.message,
      validationErrors: {},
      formData: req.body
    });
  }
});

module.exports = router;
