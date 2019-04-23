const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/balance", (req, res) => {
  res.render("balance", { title: "Balance" });
});

module.exports = router;