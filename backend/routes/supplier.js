const router = require("express").Router();
const Supplier = require("../models/Supplier");
const auth = require("../middleware/auth");

router.post("/", auth(["Admin"]), async (req, res) => {
  res.json(await Supplier.create(req.body));
});

router.get("/", auth(), async (req, res) => {
  res.json(await Supplier.find());
});

module.exports = router;
