const express = require("express");
const router = express.Router();
const { create, list } = require("../../controllers/beyond_the_word/beyond_the_word_section");

const { requireSignin, adminMiddleware } = require("../../controllers/auth");

router.post("/beyond-the-word", requireSignin, adminMiddleware, create);
router.get("/beyond-the-word/sections", list);

module.exports = router;