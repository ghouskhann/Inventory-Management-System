const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

/**
 * CREATE TRANSACTION
 */
router.post("/", async (req, res) => {
  try {
    console.log("📝 Creating transaction:", req.body);
    const { productId, type, quantity } = req.body;
    const userId = req.user ? req.user.id : null;

    const transaction = await Transaction.create({
      productId,
      type,
      quantity,
      userId,
      timestamp: new Date()
    });

    // Update product quantity
    const Product = require("../models/Product");
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (type === 'in') {
      product.quantity += quantity;
    } else if (type === 'out') {
      if (product.quantity < quantity) {
        return res.status(400).json({ error: "Insufficient stock for this transaction" });
      }
      product.quantity -= quantity;
    }
    await product.save();

    // LOW STOCK ALERT
    if (product.quantity <= 5) {
      console.log("🚨 LOW STOCK ALERT:", product.name);
    }

    res.status(201).json(transaction);
  } catch (err) {
    console.error("❌ Error creating transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET ALL TRANSACTIONS
 */
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('productId').populate('userId');
    res.json(transactions);
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET TRANSACTIONS BY PRODUCT
 */
router.get("/product/:productId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ productId: req.params.productId }).populate('userId');
    res.json(transactions);
  } catch (err) {
    console.error("❌ Error fetching transactions for product:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;