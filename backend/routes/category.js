const router = require("express").Router();
const Category = require("../models/Category");
const auth = require("../middleware/auth");

router.post("/", auth(["Admin"]), async (req, res) => {
  res.json(await Category.create(req.body));
});

router.get("/", auth(), async (req, res) => {
  res.json(await Category.find());
});

module.exports = router;
