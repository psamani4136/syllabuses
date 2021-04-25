const express = require("express");
const router = express.Router();
const { create, list } = require("../../controllers/beyond_the_word/beyond_the_word_title");

const { requireSignin, adminMiddleware } = require("../../controllers/auth");

router.post("/beyond-the-word-title", requireSignin, adminMiddleware, create);
router.get("/beyond-the-word/titles", list);

module.exports = router;