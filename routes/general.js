const express = require("express");
const router = express.Router();
const { create, getGeneral } = require("../controllers/general");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/general", requireSignin, adminMiddleware, create);
router.post("/syllabus-general/:slug", getGeneral);

module.exports = router;