const express = require("express");
const router = express.Router();
const { create, getGeneral } = require("../controllers/generalPsc");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/generalPsc", requireSignin, adminMiddleware, create);
router.post("/syllabus-generalPsc/:slug", getGeneral);

module.exports = router;