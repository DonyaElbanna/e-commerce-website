const ReviewModel = require("../models/review.model");
const errorHandler = require("../lib/errorhandler.lib");
const AppError = require("../utils/namespace.util");
const { UpdateAttract } = require("./attraction.service");
const Attraction = require("../models/attraction.model");

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
  // const reviews = await ReviewModel.find({});
  // if (!reviews) errorHandler(AppError.namespace.NOT_FOUND);
  // return reviews;

  try {
    const averageRatings = await ReviewModel.aggregate([
      {
        $group: {
          _id: "$attraction",
          averageRating: { $avg: "$rating" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    const attractionIds = averageRatings.map((result) => result._id);

    const attractions = await Attraction.aggregate([
      {
        $match: { _id: { $in: attractionIds } },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $addFields: {
          averageRating: {
            $let: {
              vars: {
                avgRatingObj: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: averageRatings,
                        as: "rating",
                        cond: { $eq: ["$$rating._id", "$_id"] },
                      },
                    },
                    0,
                  ],
                },
              },
              in: "$$avgRatingObj.averageRating",
            },
          },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
    ]);

    const attractionsWithAverageRating = attractions.map((attraction) => {
      const categories = attraction.populatedCategories;
      const subcategories = attraction.populatedSubcategories;

      return {
        ...attraction,
        averageRating: attraction.averageRating || 0,
        categories,
        subcategories,
      };
    });

    return attractionsWithAverageRating;
  } catch (error) {
    errorHandler(AppError.namespace.NOT_FOUND);
  }
};

module.exports = {
  addReview,
  getAllReviews,
  getReview,
  UpdateReview,
  DeleteReview,
  highestReviews,
};
