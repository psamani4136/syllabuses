const express = require("express");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/term");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/term", requireSignin, adminMiddleware, create);

router.get("/terms", list);
router.get("/term/:slug", read);
//router.post("/category-syllabuses/:slug", listCategoryWithAllSyllabuses);
router.delete("/term/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
