const express = require("express");
const router = express.Router();
const { create } = require("../controllers/monitor_headings");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/monitor-headings", requireSignin, adminMiddleware, create);

module.exports = router;