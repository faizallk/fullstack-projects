const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const Review =require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controller/reviews.js")

 

router.route("/")
.get(reviewController.index)
.post(isLoggedIn, validateReview,wrapAsync(reviewController.postReview));
  
  //DELETE REVIEW ROUTE
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))

  module.exports = router;