const reviewRoute = require("express").Router();
const {
  getListOfReviews,
  getReviewDataFromId,
  addEditReview,
  deleteReview,
} = require("../controllers/reviewController");

reviewRoute.get("/all", getListOfReviews);
reviewRoute.get("/:id", getReviewDataFromId);
reviewRoute.post("/add-edit", addEditReview);
reviewRoute.delete("/:id", deleteReview);

module.exports = reviewRoute;
