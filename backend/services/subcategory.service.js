const Subcategory = require("../models/subcategory.model");
const AppError = require("../utils/AppError.util");

const add = async (type, subCatImg, next) => {
  try {
    let subcategory = new Subcategory({
      type: type,
      image: subCatImg.secure_url,
    });
    await subcategory.save();
    return subcategory;
  } catch (err) {
    return next(new AppError("Error", 404));
  }
};

const getSubcategories = async () => {
  try {
    return await Subcategory.find();
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND", 404);
  }
};

module.exports = {
  add,
  getSubcategories,
};
