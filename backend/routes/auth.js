const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      role: req.body.role || "Manager",
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.json({ token, role: user.role });
      }
    }
  } catch (err) {
    // DB error, fallback to demo
  }

  // Fallback demo login
  if (email === "admin@khanmanagement.com" && password === "admin123") {
    const token = jwt.sign(
      { id: "demo-admin", role: "Admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({ token, role: "Admin" });
  }
  if (email === "manager@khanmanagement.com" && password === "manager123") {
    const token = jwt.sign(
      { id: "demo-manager", role: "Manager" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({ token, role: "Manager" });
  }

  res.status(401).json({ message: "Invalid email or password" });
});


module.exports = router;
