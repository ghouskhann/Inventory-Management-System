require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.set("bufferCommands", false);

app.use(cors({
  origin: [
    "https://khanmanagement207.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/api/health", (_, res) => {
  res.json({ status: "API running" });
});

app.use("/api/products", require("./routes/product"));
app.use("/api/transactions", require("./routes/transaction"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 MongoDB Connected");

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("🔴 MongoDB connection failed:", err.message);
    process.exit(1);
  });
