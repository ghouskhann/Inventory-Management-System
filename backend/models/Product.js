const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  quantity: Number,
  minStock: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
