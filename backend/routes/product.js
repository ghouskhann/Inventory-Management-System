const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// Create product (Admin only)
router.post("/", auth(["Admin"]), async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Get all products
router.get("/", auth(), async (req, res) => {
  const products = await Product.find().populate("category supplier");
  res.json(products);
});

// Stock In / Stock Out
router.put("/stock/:id", auth(), async (req, res) => {
  const { amount } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json("Product not found");

  product.quantity += amount;
  await product.save();

  // ✅ LOW STOCK ALERT (CORRECT PLACE)
  if (product.quantity <= product.minStock) {
    console.log("LOW STOCK ALERT:", product.name);
  }

  res.json(product);
});

module.exports = router;
