const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  supplier: { type: String },
  quantity: { type: Number, default: 0 },
  minStock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
