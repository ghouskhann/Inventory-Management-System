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
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/suppliers", require("./routes/supplier"));

app.listen(5000, () => console.log("Server running on 5000"));
