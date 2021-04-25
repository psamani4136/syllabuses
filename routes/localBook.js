const express = require("express");
const router = express.Router();
const { create, read, list } = require("../controllers/localBook");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/local-book", requireSignin, adminMiddleware, create);
router.get("/local-books/:slug", read);
router.get("/local-books", list);

module.exports = router;