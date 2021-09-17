const express = require("express");
const router = express.Router({ mergeParams: true });
const Brewery = require("../models/brewery");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));

module.exports = router;
