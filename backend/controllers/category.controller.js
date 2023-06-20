const Category = require("../models/category.model");
// import Category from "../models/category.model";
const AppError = require("../lib/errorhandler.lib");

const createCategory = async (req, res, next) => {
  const { type, image, image_key, city } = req.body;
  if (!type || !image || !image_key || !city) {
    return next(new AppError("all feilds required", 404));
  }
  const categoryCreated = await Category.create({
    type,
    image,
    image_key,
    city,
  });
  res.send(categoryCreated);
};

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  console.log(categories);
  res.send(categories);
};

const getCategoryByID = async (req, res) => {
  const ID = req.params.id;
  const category = await Category.findById(ID);
  res.send(category);
};

const editCategory = async (req, res) => {
  const ID = req.params.id;
  const update = req.body;
  const category = await Category.findByIdAndUpdate(ID, update);
  res.send(category);
};

const deleteCategory = async (req, res) => {
  const ID = req.params.id;
  const category = await Category.findByIdAndDelete(ID);
  res.send(category);
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryByID,
  editCategory,
  deleteCategory,
};
