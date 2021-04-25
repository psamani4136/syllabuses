const express = require("express");
const router = express.Router();
const { create, getStructure } = require("../controllers/structure");
// const { yearById } = require("../controllers/year");
// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/structure", requireSignin, adminMiddleware, create);
router.post("/syllabus-structure/:slug", getStructure);

// router.get("/sections", list);
// router.get("/:slug", read);

// router.param("yearId", yearById);

module.exports = router;