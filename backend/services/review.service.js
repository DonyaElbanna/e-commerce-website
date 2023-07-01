const ReviewModel = require("../models/review.model");
const errorHandler = require("../lib/errorhandler.lib");
const AppError = require("../utils/namespace.util");
const { UpdateAttract } = require("./attraction.service");

const addReview = async (payload) => {
  const NewReview = await ReviewModel.create(payload);
  if (!NewReview) errorHandler(AppError.namespace.NOT_FOUND);
  return NewReview;
};
const getAllReviews = async () => {
  const Reviews = await ReviewModel.find({});
  if (!Reviews) errorHandler(AppError.namespace.NOT_FOUND);
  return Reviews;
};

const getReview = async (payload) => {
  const Review = await ReviewModel.findById({ _id: payload });
  if (!Review) errorHandler(AppError.namespace.NOT_FOUND);
  return Review;
};

const UpdateReview = async (payload, id) => {
  const Review = await ReviewModel.findByIdAndUpdate({ _id: id }, payload);
  if (!Review) errorHandler(AppError.namespace.NOT_FOUND);
  const newReview = await ReviewModel.findById({ _id: id });
  return newReview;
};

const DeleteReview = async (id) => {
  const Review = await ReviewModel.findByIdAndDelete({ _id: id });
  if (!Review) errorHandler(AppError.namespace.NOT_FOUND);
  return Review;
};

const highestReviews = async () => {
  const reviews = await ReviewModel.find({});
  if (!reviews) errorHandler(AppError.namespace.NOT_FOUND);
  return reviews;
};

module.exports = {
  addReview,
  getAllReviews,
  getReview,
  UpdateReview,
  DeleteReview,
  highestReviews,
};
