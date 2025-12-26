const router = require("express").Router();
const Product = require("../models/Product");

/**
 * CREATE PRODUCT
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
 */
router.get("/", async (_, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * STOCK UPDATE
 */
router.put("/stock/:id", async (req, res) => {
  try {
    const { amount } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json("Product not found");

    product.quantity += Number(amount);
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
