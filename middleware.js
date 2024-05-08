const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpessError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create listing");
    res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// module.exports.isOwner = async (req, res, next) => {
//   let { id } = req.params;
//   let listing = await Listing.findById(id);
//   if (
//     res.locals.currUser &&
//     listing.owner &&
//     listing.owner.equals(res.locals.currUser._id)
//   ) {
//     req.flash("error", "You are not the owner of this listing!");
//     return res.redirect(`/listings/${id}`);
//   }
//   next();
// };

// listing owner middleware
module.exports.isOwner = async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).send("Listing not found");
    }

    if (
      res.locals.currUser &&
      listing.owner &&
      listing.owner.equals(res.locals.currUser._id)
    ) {
      return next();
    } else {
      req.flash("error", "You are not the owner of this listing!");
      return res.redirect(`/listings/${id}`);
    }
  } catch (err) {
    console.error("Error in isOwner middleware:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// listing validation middleware
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpessError(400, errMsg);
  } else {
    next();
  }
};

// review validation middleware
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpessError(400, errMsg);
  } else {
    next();
  }
};

// review delete middleware
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
