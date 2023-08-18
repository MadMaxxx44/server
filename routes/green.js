const express = require("express");
const router = express.Router();
const greenController = require("../controllers/greenController");

router.post("/", greenController.handleGreen);
router.get("/:username", greenController.getGreen);

module.exports = router;
