const express = require("express");
const router = express.Router({ mergeParams: true });
const Brewery = require("../models/brewery");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");

const { validateReview } = require("../middleware");

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Brewery.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/breweries/${id}`);
  })
);
// prettier-ignore
router.post("/", validateReview, catchAsync(async (req, res) => {
  
      const brewery = await Brewery.findById(req.params.id);
      const review = new Review(req.body.review);
  
      brewery.reviews.push(review);
      await review.save();
      await brewery.save();
      
      res.redirect(`/breweries/${brewery._id}`);
  
  
    }));

module.exports = router;
