const express = require("express");
const router = express.Router();
const { create, getProcessPsc } = require("../controllers/processes_Psc");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/processesPsc", requireSignin, adminMiddleware, create);
router.post("/syllabus-processPsc/:slug", getProcessPsc);

module.exports = router;