const express = require("express");
const router = express.Router();
const { create } = require("../controllers/learning_primary");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/learning", requireSignin, adminMiddleware, create);

module.exports = router;