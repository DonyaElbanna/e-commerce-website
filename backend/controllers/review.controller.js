const {
  addReview,
  getAllReviews,
  getReview,
  UpdateReview,
  DeleteReview,
  getReviewsByAttract,
  highestReviews,
} = require("../services/review.service");

const addNewReview = async (req, res, next) => {
  const NewReview = await addReview(req.body);
  res.status(201).json({ NewReview: NewReview });
};
const getReviews = async (req, res, next) => {
  const AllReviews = await getAllReviews();
  res.status(200).json({ AllReviews: AllReviews });
};

const getReviewById = async (req, res, next) => {
  const Review = await getReview(req.params.id);
  res.status(200).json({ Review: Review });
};

const updateReview = async (req, res, next) => {
  const NewReview = await UpdateReview(req.body, req.params.id);
  res.status(200).json({ NewReview: NewReview });
};

const deleteReview = async (req, res, next) => {
  const deletedReview = await DeleteReview(req.params.id);
  res.status(200).json({ deletedReview: deletedReview });
};

const getHigestReviews = async (req, res, next) => {
  const highest = await highestReviews();
  res.status(200).json(highest);
};

module.exports = {
  addNewReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getHigestReviews,
};
