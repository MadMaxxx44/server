const express = require("express");
const router = express.Router();
const redController = require("../controllers/redController");

router.post("/", redController.handleRed);
router.get("/:username", redController.getRed);

module.exports = router;
