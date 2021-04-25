const express = require("express");
const router = express.Router();
const { create, getLPrimary } = require("../controllers/lower_primary");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/lower_primary", requireSignin, adminMiddleware, create);
router.post("/syllabus-lprimary/:slug", getLPrimary);

module.exports = router;