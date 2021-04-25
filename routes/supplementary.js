const express = require("express");
const router = express.Router();
const { create, getSupplementary } = require("../controllers/supplementary");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/supplementary", requireSignin, adminMiddleware, create);
router.post("/syllabus-supplementary/:slug", getSupplementary);

module.exports = router;