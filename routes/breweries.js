const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const breweries = require("../controllers/breweries");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { isLoggedIn, isAuthor, validateBrewery } = require("../middleware");

//prettier-ignore
router.route("/")
  .get(catchAsync(breweries.index))
  .post(isLoggedIn, validateBrewery, upload.single('image'), catchAsync(breweries.createBrewery));

router.get("/new", isLoggedIn, breweries.renderNewForm);

//prettier-ignore
router.route("/:id")
  .get(catchAsync(breweries.renderShowBrewery))
  .put(validateBrewery, isAuthor, catchAsync(breweries.updateBrewery))
  .delete(isAuthor, catchAsync(breweries.deleteBrewery));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(breweries.renderEditForm));

module.exports = router;
