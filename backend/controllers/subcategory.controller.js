const AppError = require("../utils/AppError.util");
const { FAILURE } = require("../utils/namespace.util").namespace;
const { add, getSubcategories } = require("../services/subcategory.service");
const cloudinary = require("../utils/cloudinary.util");

const addSubcategory = async (req, res, next) => {
  const { type, image } = req.body;
  const subCatImg = await cloudinary.uploader.upload(image);

  try {
    const subcategory = await add(type, subCatImg, next);
    res.status(201).json({ subcategory });
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getAllSubcategories = async (req, res, next) => {
  const subcategories = await getSubcategories();
  res.status(200).json({ subcategories });
};

module.exports = {
  addSubcategory,
  getAllSubcategories,
};
