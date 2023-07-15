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
    .populate("subcategory")
    .populate("review");
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
              count: { $sum: 1 },
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

  if (attract.length == 0) return next(new AppError(NOT_FOUND, 404));
  return attract[0];
};

const UpdateAttract = async (payload, id) => {
  const attract = await attractionModel.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      upsert: true,
      new: true,
    }
  );
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
  // const attract = await attractionModel
  //   .find({ category: id })
  //   .populate("category")
  //   .populate("subcategory");
  // ! to get avg rating to be put in card
const attract = await attractionModel.aggregate([
    { $match: { category: new mongoose.Types.ObjectId(id) } },
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
const getAllAttractions = async () => {
  const attractions = await attractionModel.find();
  return attractions;
};
module.exports = {
  addAttract,
  getAllAttract,
  getAttract,
  UpdateAttract,
  DeleteAttract,
  SetImages,
  getAttractByCategory,
  getAttractBySubcategory,
  getAllAttractions,
  // getHighestAttractions,
};
