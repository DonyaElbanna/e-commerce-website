const Category = require("../models/category.model");
const AppError = require("../utils/AppError.util");

const create = async (city, url, next) => {
  try {
    let category = new Category({
      city: city,
      image: url,
    });
    await category.save();
    return category;
  } catch (err) {
    return next(new AppError("Error", 404));
  }
};

const getCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND", 404);
  }
};

const getCategory = async (id) => {
  try {
    return await Category.findById(id);
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND", 404);
  }
};

const editCat = async (id, edits) => {
  try {
    return await Category.findByIdAndUpdate(id, edits, {
      upsert: true,
      new: true,
    });
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND TO EDIT", 404);
  }
};

const deleteCat = async (id) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND TO DELETE", 404);
  }
};

module.exports = {
  create,
  getCategories,
  getCategory,
  editCat,
  deleteCat,
};
