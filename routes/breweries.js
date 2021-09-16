const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Brewery = require("../models/brewery");
const ExpressError = require("../utils/ExpressError");

const { isLoggedIn, isAuthor, validateBrewery } = require("../middleware");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const breweries = await Brewery.find({});
    res.render("breweries/index", {
      breweries,
    });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("breweries/new");
});

// prettier-ignore
router.put("/:id", validateBrewery, isAuthor, catchAsync(async (req, res) => {
      const { id } = req.params;
      const brewery = await Brewery.findByIdAndUpdate(id, req.body.brewery, {
        runValidators: true,
        new: true,
      });
      res.redirect(`/breweries/${brewery._id}`);
    })
  );

// prettier-ignore
router.delete("/:id", isAuthor, catchAsync(async (req, res) => {
      const { id } = req.params;
      await Brewery.findByIdAndDelete(id);
      res.redirect("/breweries");
    })
  );

// prettier-ignore
router.post("/", isLoggedIn, validateBrewery, isAuthor, catchAsync(async (req, res) => {
      const newBrew = new Brewery(req.body.brewery);
      newBrew.author = req.user._id;
      await newBrew.save();
       req.flash('success', 'Successfuly Added a New Brewery!');
      res.redirect(`breweries/${newBrew._id}`);
    })
  );

//prettier-ignore
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;

    const brewery = await Brewery.findById(id);
    if (!brewery) {
      req.flash("error", "Sorry! Cannot find that brewery. ");
      res.redirect("/breweries");
    }
    res.render("breweries/edit", { brewery });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const brewery = await Brewery.findById(id).populate("reviews");
    if (!brewery) {
      req.flash("error", "Sorry! Cannot find that brewery. ");
      res.redirect("/breweries");
    }
    res.render("breweries/show", { brewery });
  })
);

module.exports = router;
