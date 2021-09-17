const Brewery = require("../models/brewery");

module.exports.index = async (req, res) => {
  delete req.session.returnTo;
  const breweries = await Brewery.find({});
  res.render("breweries/index", { breweries });
};

module.exports.renderNewForm = (req, res) => {
  res.render("breweries/new");
};

module.exports.updateBrewery = async (req, res) => {
  const { id } = req.params;
  const brewery = await Brewery.findByIdAndUpdate(id, req.body.brewery, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/breweries/${brewery._id}`);
};

module.exports.createBrewery = async (req, res) => {
  const newBrew = new Brewery(req.body.brewery);
  newBrew.author = req.user._id;
  await newBrew.save();
  req.flash("success", "Successfuly Added a New Brewery!");
  res.redirect(`breweries/${newBrew._id}`);
};

module.exports.deleteBrewery = async (req, res) => {
  const { id } = req.params;
  await Brewery.findByIdAndDelete(id);
  res.redirect("/breweries");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const brewery = await Brewery.findById(id);
  if (!brewery) {
    req.flash("error", "Sorry! Cannot find that brewery. ");
    res.redirect("/breweries");
  }
  res.render("breweries/edit", { brewery });
};

module.exports.renderShowBrewery = async (req, res) => {
  const { id } = req.params;
  const brewery = await Brewery.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  if (!brewery) {
    req.flash("error", "Sorry! Cannot find that brewery. ");
    res.redirect("/breweries");
  }
  res.render("breweries/show", { brewery });
};
