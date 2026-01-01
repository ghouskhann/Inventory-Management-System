require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: [
    "https://khanmanagement207.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    // Seed demo users
    const User = require("./models/User");
    const bcrypt = require("bcryptjs");
    const existingAdmin = await User.findOne({ email: "admin@khanmanagement.com" });
    if (!existingAdmin) {
      const hashed = await bcrypt.hash("admin123", 10);
      await User.create({ name: "Admin", email: "admin@khanmanagement.com", password: hashed, role: "Admin" });
      console.log("✅ Admin user created");
    }
    const existingManager = await User.findOne({ email: "manager@khanmanagement.com" });
    if (!existingManager) {
      const hashed = await bcrypt.hash("manager123", 10);
      await User.create({ name: "Manager", email: "manager@khanmanagement.com", password: hashed, role: "Manager" });
      console.log("✅ Manager user created");
    }
  })
  .catch(err => console.error("❌ Mongo Error:", err));

app.get("/api/health", (_, res) => {
  res.json({ status: "API running" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/transactions", require("./routes/transaction"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
