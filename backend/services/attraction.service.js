const attractionModel = require("../models/attraction.model");
const errorHandler = require("../lib/errorhandler.lib");
const AppError = require("../utils/AppError.util");
const { NOT_FOUND } = require("../utils/namespace.util").namespace;
const mongoose = require("mongoose");

const addAttract = async (payload, urls) => {
  const NewAttract = new attractionModel(payload);
  NewAttract.Images = urls;
  NewAttract.save();
  if (!NewAttract) errorHandler(AppError.namespace.NOT_FOUND);
  return NewAttract;
};
const getAllAttract = async () => {
  const attractions = await attractionModel
    .find()
    .populate("category")
    .populate("subcategory");
  if (!attractions) errorHandler(AppError.namespace.NOT_FOUND);
  return attractions;
};

const getAttract = async (payload) => {
  const attract = await attractionModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(payload) } },
    {
      $lookup: {
        from: "reviews",
        let: { id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$id", "$attraction"] } } },
          {
            $group: {
              _id: "$attraction",
              avgRating: { $avg: "$rating" },
            },
          },
        ],
        as: "reviews",
      },
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
  ]);

  // const newAttraction = await attractionModel.populate(attract, "category");

  // const finalAttr = await attractionModel.populate(
  //   newAttraction,
  //   "subcategory"
  // );

  if (!attract) return next(new AppError(NOT_FOUND, 404));
  return attract;
};

const UpdateAttract = async (payload, id) => {
  const attract = await attractionModel.findByIdAndUpdate({ _id: id }, payload);
  if (!attract) errorHandler(AppError.namespace.NOT_FOUND);
  const newAttract = await attractionModel.findById({ _id: id });
  return attract;
};

const DeleteAttract = async (id) => {
  const attract = await attractionModel.findByIdAndDelete({ _id: id });
  if (!attract) errorHandler(AppError.namespace.NOT_FOUND);
  return attract;
};

const SetImages = async (id, urls) => {
  const attract = await attractionModel.findByIdAndUpdate(
    { _id: id },
    { Images: urls }
  );
  if (!attract) errorHandler(AppError.namespace.NOT_FOUND);
  const newAttract = await attractionModel.findById({ _id: id });
  return newAttract;
};

const getAttractByCategory = async (id) => {
  const attract = await attractionModel
    .find({ category: id })
    .populate("category")
    .populate("subcategory");
  // if (attract.length == 0) return {next(new AppError(NOT_FOUND, 404))};
  // return empty array if not found to not cause get errors in front-end
  return attract;
};

const getAttractBySubcategory = async (id) => {
  const attract = await attractionModel
    .find({ subcategory: id })
    .populate("category")
    .populate("subcategory");
  // if (attract.length == 0) return {next(new AppError(NOT_FOUND, 404))};
  // return empty array if not found to not cause get errors in front-end
  return attract;
};

// const getHighestAttractions = async () => {
//   const attracts = await Review.aggregate([
//     {
//       $group: {
//         _id: "$attraction",
//         avgRating: { $avg: "$rating" },
//       },
//     },
//     {
//       $lookup: {
//         from: "attractions",
//         localField: "_id",
//         foreignField: "_id",
//         as: "attraction",
//       },
//     },
//     { $sort: { avgRating: -1 } },
//     { $limit: 6 },
//   ]);

//   if (!attracts) return next(new AppError(NOT_FOUND, 404));
//   return attracts;
// };

module.exports = {
  addAttract,
  getAllAttract,
  getAttract,
  UpdateAttract,
  DeleteAttract,
  SetImages,
  getAttractByCategory,
  getAttractBySubcategory,
  // getHighestAttractions,
};
