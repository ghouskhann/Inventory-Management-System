require("dotenv").config();
const mongoose = require("mongoose");

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔗 Connected to MongoDB");

    // Delete old products with ObjectId schema
    const result = await mongoose.connection.collection("products").deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} old products`);

    await mongoose.connection.close();
    console.log("✅ Migration complete! Database is ready for new products with string categories/suppliers.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err.message);
    process.exit(1);
  }
}

migrate();
