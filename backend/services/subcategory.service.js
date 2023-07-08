const Subcategory = require("../models/subcategory.model");
const AppError = require("../utils/AppError.util");
const Attraction = require("../models/attraction.model");

const add = async (type, url, next) => {
  try {
    let subcategory = new Subcategory({
      type: type,
      image: url,
    });
    await subcategory.save();
    return subcategory;
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getSubcategories = async () => {
  try {
    return await Subcategory.find();
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND", 404);
  }
};

const getSubcategory = async (id, next) => {
  try {
    const subcategory = await Subcategory.findById(id);
    return subcategory;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const editSubcat = async (id, edits) => {
  try {
    return await Subcategory.findByIdAndUpdate(id, edits, {
      upsert: true,
      new: true,
    });
  } catch (error) {
    throw new AppError("THIS CATEGORY IS NOT FOUND TO EDIT", 404);
  }
};

const remove = async (id, attrID, next) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(id);
    const updatedAttr = await Attraction.findOneAndUpdate(
      { _id: attrID },
      { $pull: { subcategories: attrID } },
      { new: true }
    );
    return { subcategory, updatedAttr };
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

module.exports = {
  add,
  getSubcategories,
  getSubcategory,
  editSubcat,
  remove,
};
