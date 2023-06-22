const express = require("express");
const {
  addNewReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/", addNewReview);

router.get("/", getReviews);

router.get("/:id", getReviewById);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;