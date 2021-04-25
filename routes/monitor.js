const express = require("express");
const router = express.Router();
const { create } = require("../controllers/monitor");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/monitorPsc", requireSignin, adminMiddleware, create);

module.exports = router;