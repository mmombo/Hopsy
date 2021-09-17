const Brewery = require("../models/brewery");
const Review = require("../models/review");

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Brewery.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Sucessfully Removed");
  res.redirect(`/breweries/${id}`);
};

module.exports.createReview = async (req, res) => {
  const brewery = await Brewery.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  brewery.reviews.push(review);
  await review.save();
  await brewery.save();
  req.flash("success", "Created new review!");
  res.redirect(`/breweries/${brewery._id}`);
};
