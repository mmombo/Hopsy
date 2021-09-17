const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("welcome", "Logged in successfully!");
  const redirectURL = req.session.returnTo || "/breweries";
  delete req.session.returnTo;
  res.redirect(redirectURL);
};

module.exports.register = async (req, res) => {
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
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("welcome", "Sucessfully Logged Out!");
  res.redirect("/breweries");
};
