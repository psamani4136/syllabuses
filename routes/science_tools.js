const express = require("express");
const router = express.Router();
const { create, getScience } = require("../controllers/science_tools");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/science", requireSignin, adminMiddleware, create);
router.post("/syllabus-science/:slug", getScience);

module.exports = router;