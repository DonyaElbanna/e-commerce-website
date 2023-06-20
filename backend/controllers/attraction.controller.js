const attraction = require("../models/attraction.model");
const AppError = require("../utils/namespace.util");

const addAttraction = async (req, res, next) => {
  const attract = await attraction.create(req.body);
  attract.save();
  res.send(attract);
};
const getAllAttraction = async (req, res, next) => {
  const attract = await attraction.find({});
  res.send(attract);
};

const getAttraction = async (req, res, next) => {
  const attract = await attraction.findById({ _id: req.params.id });
  if (!attract) {
    return next(AppError.namespace.NOT_FOUND);
  }
  res.status(200).send(attract);
};

const updateAttraction = async (req, res, next) => {
  const attract = await attraction.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (!attract) {
    return next(AppError.namespace.NOT_FOUND);
  }
  const newAttract = await attraction.findById({ _id: req.params.id });

  res.status(200).send(newAttract);
};

const deleteAttraction = async (req, res, next) => {
  const attract = await attraction.findByIdAndDelete({ _id: req.params.id });
  if (!attract) {
    return next(AppError.namespace.NOT_FOUND);
  }
  res.status(200).send("attract Removed Successfully");
};

module.exports = {
  addAttraction,
  getAllAttraction,
  getAttraction,
  updateAttraction,
  deleteAttraction,
};
