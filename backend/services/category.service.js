const Category = require("../models/category.model");
const AppError = require("../utils/AppError.util");

const createCategory = async (data) => {
  try {
    return await Category.create(data);
  } catch (error) {
    throw new AppError(err);
  }
};

const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND", 404);
  }
};

const getCategoryByID = async (id) => {
  try {
    return await Category.findById(id);
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND", 404);
  }
};

const editCategory = async (id, edits) => {
  try {
    return await Category.findByIdAndUpdate(id, edits);
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND TO EDIT", 404);
  }
};

const deleteCategory = async (id) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND TO DELETE", 404);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByID,
  editCategory,
  deleteCategory,
};
