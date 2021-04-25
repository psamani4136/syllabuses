const express = require("express");
const router = express.Router();   
const { create, getHeadPsc } = require("../controllers/head_psc");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/headPsc", requireSignin, adminMiddleware, create);
router.post("/syllabus-headPsc/:slug", getHeadPsc);

module.exports = router;