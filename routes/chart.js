const express = require("express");
const router = express.Router();
const chartController = require("../controllers/chartController");

router.post("/", chartController.handleChart);
router.get("/:username", chartController.getChart);

module.exports = router;
