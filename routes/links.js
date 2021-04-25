const express = require("express");
const router = express.Router();
const { create } = require("../controllers/links");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/links", requireSignin, adminMiddleware, create);

module.exports = router;