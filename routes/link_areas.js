const express = require("express");
const router = express.Router();
const { create } = require("../controllers/link_areas");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/link-areas", requireSignin, adminMiddleware, create);

module.exports = router;