const Category = require("../models/category.model");
const AppError = require("../utils/namespace.util");
// const AppError = require("../lib/errorhandler.lib");

const createCategory = async (req, res, next) => {
  const categoryCreated = await Category.create(req.body);
  // categoryCreated.save();
  res.send(categoryCreated);
};

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
};

const getCategoryByID = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError("THIS CATEGORY IS NOT FOUND", 404));
  }
  res.send(category);
};

const editCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body);
  if (!category) {
    return next(new AppError("THIS CATEGORY IS NOT FOUND TO EDIT", 404));
  }
  res.send(category);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError("THIS CATEGORY IS NOT FOUND TO DELETE", 404));
  }
  res.status(200).send("Category is Removed Successfully");
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryByID,
  editCategory,
  deleteCategory,
};
