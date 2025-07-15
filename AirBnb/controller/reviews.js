const Review = require("../models/review")
const Listing = require("../models/listing")

module.exports.index = (req,res)=>{
    let {id} = req.params;
    res.redirect(`/listings/${id}`);
  }

  module.exports.postReview = async (req,res)=>{
    let newReview = new Review(req.body.review);
    let {id} = req.params;
    let listing = await Listing.findById(id);
    newReview.author = req.user._id;
    await listing.reviews.push(newReview);
     newReview.save();
     listing.save();
     req.flash("success","New Review Created!!")
     res.redirect(`/listings/${id}`)
  }

  module.exports.deleteReview = async (req,res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!!")
    res.redirect(`/listings/${id}`)
  }