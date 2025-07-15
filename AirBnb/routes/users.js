const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userController = require("../controller/users")

//Sign up users

router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.postUser));


//render lgin form
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/users/login",failureFlash:true }),
userController.saveLoginUser);


//LogOut Route

router.route("/logout")
.get(userController.logOutUser);


module.exports = router;