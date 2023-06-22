const attractionModel = require("../models/attraction.model");
const errorHandler = require("../lib/errorhandler.lib");
const AppError = require("../utils/namespace.util");

const addAttract = async (payload) => {
  const NewAttract = await attractionModel.create(payload);
  if (!NewAttract) errorHandler(AppError.namespace.NOT_FOUND);
  return NewAttract;
};
const getAllAttract = async () => {
  const attractions = await attractionModel.find();
  if (!attractions) errorHandler(AppError.namespace.NOT_FOUND);
  return attractions;
};

const getAttract = async (payload) => {
  const attract = await attractionModel
    .findById(payload)
    .populate({ path: "review" });
  if (!attract) errorHandler(AppError.namespace.NOT_FOUND);
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
  const attract = await attractionModel.find({ CategoryId: id });
  if (!attract) errorHandler(AppError.namespace.NOT_FOUND);
  return attract;
};

module.exports = {
  addAttract,
  getAllAttract,
  getAttract,
  UpdateAttract,
  DeleteAttract,
  SetImages,
  getAttractByCategory,
};
