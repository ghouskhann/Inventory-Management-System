const router = require("express").Router();
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

/**
 * CREATE PRODUCT
 */
router.post("/", async (req, res) => {
  try {
    console.log("📝 Creating product:", req.body);
    // Check for duplicates
    const existingProduct = await Product.findOne({ name: req.body.name, supplier: req.body.supplier });
    if (existingProduct) {
      return res.status(400).json({ message: "Product from this supplier already exists" });
    }
    // Debug: show what Mongoose thinks the Product schema is at runtime
    try {
      console.log("DEBUG Product.schema.obj:", Product.schema && Product.schema.obj);
      console.log("DEBUG Product.schema.paths.category:", Product.schema && Product.schema.path && Product.schema.path('category'));
    } catch (dErr) {
      console.error("DEBUG error reading schema:", dErr);
    }
    const product = await Product.create(req.body);
    console.log("✅ Product created:", product);
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET ALL PRODUCTS
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    console.log("✅ Retrieved products:", products.length);
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * SEARCH PRODUCTS
 */
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    let products;
    if (query) {
      products = await Product.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } }
        ]
      });
    } else {
      products = await Product.find();
    }
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

    const quantityChange = Number(amount);
    const type = quantityChange > 0 ? 'in' : 'out';

    product.quantity += quantityChange;
    await product.save();

    // Create transaction
    await Transaction.create({
      productId: product._id,
      type,
      quantity: Math.abs(quantityChange),
      timestamp: new Date()
    });

    // LOW STOCK ALERT
    if (product.quantity <= 5) {
      console.log("🚨 LOW STOCK ALERT:", product.name);
    }

    res.json(product);
  } catch (err) {
    console.error("❌ Error updating stock:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE PRODUCT BY ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
