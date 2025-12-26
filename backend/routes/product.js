const router = require("express").Router();
const Product = require("../models/Product");

/**
 * CREATE PRODUCT
 * (Auth REMOVED for now)
 */
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET ALL PRODUCTS
 * (Auth REMOVED for now)
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * STOCK IN / STOCK OUT
 */
router.put("/stock/:id", async (req, res) => {
  try {
    const { amount } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json("Product not found");

    product.quantity += Number(amount);
    await product.save();

    // LOW STOCK ALERT
    if (product.quantity <= product.minStock) {
      console.log("LOW STOCK ALERT:", product.name);
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
