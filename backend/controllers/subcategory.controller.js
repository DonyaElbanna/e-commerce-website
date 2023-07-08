const AppError = require("../utils/AppError.util");
const { FAILURE } = require("../utils/namespace.util").namespace;
const {
  add,
  getSubcategories,
  getSubcategory,
  editSubcat,
  remove,
} = require("../services/subcategory.service");
const cloudinary = require("../utils/cloudinary.util");

const addSubcategory = async (req, res, next) => {
  const { type, image } = req.body;
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const newPath = await uploader(image);

  try {
    const subcategory = await add(type, newPath.url, next);
    res.status(201).json({ subcategory });
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getAllSubcategories = async (req, res, next) => {
  const subcategories = await getSubcategories();
  res.status(200).json({ subcategories });
};

const getSingleSubcategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const subcategory = await getSubcategory(id);
    if (!subcategory) {
      return next(new AppError(FAILURE, 404));
    }
    res.status(200).json(subcategory);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const editSubcategory = async (req, res) => {
  const subcategory = await editSubcat(req.params.id, req.body);
  res.status(200).json(subcategory);
};

const deleteSubcategory = async (req, res, next) => {
  const { id } = req.params;
  const attrID = req.body.attrID;
  try {
    const deletedSubcat = await remove(id, attrID, next);
    res.status(200).json(deletedSubcat);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

module.exports = {
  addSubcategory,
  getAllSubcategories,
  getSingleSubcategory,
  editSubcategory,
  deleteSubcategory,
};
