const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("users/login");
});

router.post("/", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
  req.flash("welcome", "Logged in successfully!");
  console.log(req.session.returnTo);
  const redirectURL = req.session.returnTo || "/breweries";
  delete req.session.returnTo;
  res.redirect(redirectURL);
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("welcome", `Hi ${registeredUser.username}, Welcome to Hopsy!`);
        res.redirect("/breweries");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/login/register");
    }
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("welcome", "Sucessfully Logged Out!");
  res.redirect("/breweries");
});

module.exports = router;
