const express = require("express");
const router = express.Router();
const { create } = require("../controllers/issue");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/issuePsc", requireSignin, adminMiddleware, create);

module.exports = router;