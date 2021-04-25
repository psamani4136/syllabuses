const express = require("express");
const router = express.Router();
const { create, getSkillsPss } = require("../controllers/skills_pss");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/skillsPss", requireSignin, adminMiddleware, create);
router.post("/syllabus-skillsPss/:slug", getSkillsPss);

module.exports = router;