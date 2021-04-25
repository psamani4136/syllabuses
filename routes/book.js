const express = require("express");
const router = express.Router();
const { create, getBook } = require("../controllers/book");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/book", requireSignin, adminMiddleware, create);
router.post("/syllabus-book/:slug", getBook);

module.exports = router;