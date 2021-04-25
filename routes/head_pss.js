const express = require("express");
const router = express.Router();
const { create, getHeadPss } = require("../controllers/head_pss");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/headPss", requireSignin, adminMiddleware, create);
router.post("/syllabus-headPss/:slug", getHeadPss);

module.exports = router;