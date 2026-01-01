const mongoose = require("mongoose");

// Force remove old model if it exists to prevent caching issues
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  supplier: String,
  quantity: Number,
  minStock: Number,
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
