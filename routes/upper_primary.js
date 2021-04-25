const express = require("express");
const router = express.Router();
const { create, getUPrimary } = require("../controllers/upper_primary");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/upper_primary", requireSignin, adminMiddleware, create);
router.post("/syllabus-uprimary/:slug", getUPrimary);

module.exports = router;