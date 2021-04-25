const express = require("express");
const router = express.Router();
const { create, getSpecific } = require("../controllers/specificPsc");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/specificPsc", requireSignin, adminMiddleware, create);
router.post("/syllabus-specificPsc/:slug", getSpecific);

module.exports = router;