const express = require("express");
const router = express.Router();
const { create } = require("../../controllers/beyond_the_word/beyond_the_word_text");

const { requireSignin, adminMiddleware } = require("../../controllers/auth");

router.post("/beyond-the-word-text", requireSignin, adminMiddleware, create);

module.exports = router;