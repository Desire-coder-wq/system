const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/product");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      color: req.body.color,
      description: req.body.description,
      image: req.file ? req.file.path : null
    });

    await product.save();
    res.json({ success: true, product });

  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      for (let field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ success: false, errors });
    }
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// READ
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
