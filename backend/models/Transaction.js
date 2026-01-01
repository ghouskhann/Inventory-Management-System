const mongoose = require("mongoose");

// Force remove old model if it exists to prevent caching issues
if (mongoose.models.Transaction) {
  delete mongoose.models.Transaction;
}

const TransactionSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  type: { type: String, enum: ['in', 'out'], required: true },
  quantity: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);