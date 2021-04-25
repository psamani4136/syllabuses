const express = require("express");
const router = express.Router();
const { create, list, remove } = require("../controllers/substrandTitle");

// validators
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/substrand-title", requireSignin, adminMiddleware, create);

router.get("/substrand-title-all", list);
// router.get("/substrand-title/:slug", read);
router.delete("/substrand-title/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
