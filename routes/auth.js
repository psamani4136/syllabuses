const express = require("express");
//const { userById } = require("../controllers/user");

//validation
const { runValidation } = require("../validator");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validator/auth");

const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

// import password reset validator

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", requireSignin, signout);

// any route containing :userId, our app will first execute userByID()
//router.param("userId", userById);

module.exports = router;
