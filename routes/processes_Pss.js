const express = require("express");
const router = express.Router();
const { create, getProcessPss } = require("../controllers/processes_Pss");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/processesPss", requireSignin, adminMiddleware, create);
router.post("/syllabus-processPss/:slug", getProcessPss);

module.exports = router;