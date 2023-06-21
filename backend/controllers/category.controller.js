const Category = require("../models/category.model");
<<<<<<< HEAD
const AppError = require("../utils/namespace.util");
// const AppError = require("../lib/errorhandler.lib");
// const { default: categoryService } = require("../services/category.service");
const createCategory = async (req, res, next) => {
  // const category = await categoryService.createCategory(req.body)
  res.status(201).json({category:category});
=======
const AppError = require("../utils/AppError.util");
const categoryService = require("../services/category.service");

const createCategory = async (req, res, next) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json({ category: category });
>>>>>>> 80f7f0208c4cc462ef71b140e55de39cbc637f80
};

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json({ categories: categories });
};

const getCategoryByID = async (req, res) => {
  const category = await categoryService.getCategoryByID(req.params.id);
  res.status(200).json({ category: category });
};

const editCategory = async (req, res) => {
  const category = await categoryService.editCategory(req.params.id, req.body);
  res.status(200).json({ category: category });
};

const deleteCategory = async (req, res) => {
  const category = await categoryService.deleteCategory(req.params.id);
  res.status(200).send("Category is Removed Successfully");
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryByID,
  editCategory,
  deleteCategory,
};
