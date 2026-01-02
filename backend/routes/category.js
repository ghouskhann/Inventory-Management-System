const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  res.json(await Category.create(req.body));
});

router.get("/", async (req, res) => {
  res.json(await Category.find());
});

module.exports = router;
