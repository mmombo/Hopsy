const express = require("express");
const path = require("path");
const Brewery = require("./models/brewery");
const Review = require("./models/review");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const catchAsync = require("./utils/catchAsync");
const morgan = require("morgan");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const { brewerySchema, reviewSchema } = require("./schemas.js");

const app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
app.use(morgan("dev"));

mongoose.connect("mongodb://localhost:27017/Yelp-Beer", (err) => {
  if (err) throw err;
  //   console.log("connected to MongoDB");
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database Connected");
}).on("error", console.error.bind(console, "Connection Error:"));

const validateBrewery = (req, res, next) => {
  const { error } = brewerySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  console.log(req.body.review.body);
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/breweries/new", (req, res) => {
  res.render("breweries/new");
});

app.get(
  "/breweries/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const brewery = await Brewery.findById(id);
    res.render("breweries/edit", {
      brewery,
    });
  })
);

app.get(
  "/breweries/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const brewery = await Brewery.findById(id).populate("reviews");
    res.render("breweries/show", { brewery });
  })
);

app.get(
  "/breweries",
  catchAsync(async (req, res) => {
    const breweries = await Brewery.find({});
    res.render("breweries/index", {
      breweries,
    });
  })
);
// prettier-ignore
app.post(
  "/breweries", validateBrewery, catchAsync(async (req, res) => {
    const newBrew = new Brewery(req.body.brewery);
    await newBrew.save();
    res.redirect(`breweries/${newBrew._id}`);
  })
);
// prettier-ignore
app.put(
  "/breweries/:id", validateBrewery, catchAsync(async (req, res) => {
    const { id } = req.params;
    const brewery = await Brewery.findByIdAndUpdate(id, req.body.brewery, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/breweries/${brewery._id}`);
  })
);
// prettier-ignore
app.delete("/breweries/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Brewery.findByIdAndDelete(id);
    res.redirect("/breweries");
  })
);

app.delete(
  "/breweries/:id/reviews/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Brewery.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/breweries/${id}`);
  })
);
// prettier-ignore
app.post("/breweries/:id/reviews", validateReview, catchAsync(async (req, res) => {

    const brewery = await Brewery.findById(req.params.id);
    const review = new Review(req.body.review);

    brewery.reviews.push(review);
    await review.save();
    await brewery.save();
    
    res.redirect(`/breweries/${brewery._id}`);


  }));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("breweries/error", { err });
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});
