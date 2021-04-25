const express = require("express");
const router = express.Router();
const { create, getSocial } = require("../controllers/social_tools");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/social", requireSignin, adminMiddleware, create);
router.post("/syllabus-social/:slug", getSocial);

module.exports = router;