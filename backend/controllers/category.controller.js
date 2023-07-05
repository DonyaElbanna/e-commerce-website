const AppError = require("../utils/AppError.util");
const { FAILURE } = require("../utils/namespace.util").namespace;
// const AppError = require("../lib/errorhandler.lib");
const {
  create,
  getCategories,
  getCategory,
  deleteCat,
  editCat,
  default: categoryService,
} = require("../services/category.service");
const cloudinary = require("../utils/cloudinary.util");

const createCategory = async (req, res, next) => {
  const { city, image } = req.body;
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const newPath = await uploader(image);

  try {
    const category = await create(city, newPath.url, next);
    res.status(201).json(category);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getAllCategories = async (req, res) => {
  const categories = await getCategories();
  res.status(200).json({ categories });
};

const getCategoryByID = async (req, res) => {
  const category = await getCategory(req.params.id);
  res.status(200).json({ category: category });
};

const editCategory = async (req, res) => {
  const category = await editCat(req.params.id, req.body);
  res.status(200).json(category);
};

const deleteCategory = async (req, res) => {
  const category = await deleteCat(req.params.id);
  res.status(200).send("Category is Removed Successfully");
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryByID,
  editCategory,
  deleteCategory,
};
