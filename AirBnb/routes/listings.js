const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");
const { listingSchema } = require("../listingSchema.js");
const listingController = require("../controller/listings.js")
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})


//All listings

router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.postNewListing)
);

router.get("/search", async (req,res)=>{
  let {country} = req.query;
  let listings = await Listing.find({country: country});
  res.render("./listings/search.ejs",{listings})
})
//Create Route

router.get("/new", isLoggedIn, listingController.renderNewForm);



//Show route


router.route("/:id")
.get(
  wrapAsync(listingController.showListing)
)
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)//update listing
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)//delete listing
);
//UPDATE route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);






module.exports = router;
