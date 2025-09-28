const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Product name is required"] },
  category: { type: String, required: [true, "Category is required"] },
  price: { type: Number, required: [true, "Price is required"], min: 1 },
  quantity: { type: Number, required: [true, "Quantity is required"], min: 0 },
  color: String,
  description: { type: String, required: [true, "Description is required"] },
  image: { type: String, required: [true, "Image is required"] }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
