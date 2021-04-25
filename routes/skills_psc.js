const express = require("express");
const router = express.Router();       
const { create, getSkillsPsc } = require("../controllers/skills_psc");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/skillsPsc", requireSignin, adminMiddleware, create);
router.post("/syllabus-skillsPsc/:slug", getSkillsPsc);

module.exports = router;