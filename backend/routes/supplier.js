const router = require("express").Router();
const Supplier = require("../models/Supplier");

router.post("/", async (req, res) => {
  res.json(await Supplier.create(req.body));
});

router.get("/", async (req, res) => {
  res.json(await Supplier.find());
});

module.exports = router;
