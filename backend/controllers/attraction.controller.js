const {
  addAttract,
  getAllAttract,
  getAttract,
  UpdateAttract,
  DeleteAttract,
  SetImages,
  getAttractByCategory,
  getAttractBySubcategory,
  getAllAttractions,
} = require("../services/attraction.service");
const cloudinary = require("../utils/cloudinary.util");
const AppError = require("../utils/AppError.util");
const { FAILURE } = require("../utils/namespace.util").namespace;

const addAttraction = async (req, res, next) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  const urls = [];
  const files = req.body.Images;
  if (files) {
    for (const file of files) {
      const newPath = await uploader(file);
      urls.push(newPath.url);
    }
  }

  const newAttraction = await addAttract(req.body, urls);
  res.status(201).json({ newAttraction: newAttraction });
};

const getAllAttraction = async (req, res, next) => {
  const AllAttraction = await getAllAttract();
  res.status(200).json({ AllAttraction: AllAttraction });
};

const getAttraction = async (req, res, next) => {
  const Attraction = await getAttract(req.params.id, next);
  res.status(200).json({ Attraction: Attraction });
};

const updateAttraction = async (req, res, next) => {
  const NewAttraction = await UpdateAttract(req.body, req.params.id);
  res.status(200).json({ NewAttraction: NewAttraction });
};

const SetUrls = async (req, res, next) => {
  const NewAttraction = await SetImages(req.params.id, req.urls);
  res.status(200).json({ NewAttraction: NewAttraction });
};

const deleteAttraction = async (req, res, next) => {
  const deletedAttraction = await DeleteAttract(req.params.id);
  res.status(200).json({ deletedAttraction: deletedAttraction });
};

const getAttractionByCategory = async (req, res, next) => {
  try {
    const Attractions = await getAttractByCategory(req.params.id, next);
    // if (!Attractions) {
    //   return Attractions;
    // }
    res.status(200).json({ Attractions: Attractions });
  } catch (err) {
    console.log(err);
    return next(new AppError(FAILURE, 404));
  }
};

const getAttractionBySubcategory = async (req, res, next) => {
  try {
    const Attractions = await getAttractBySubcategory(req.params.id, next);
    res.status(200).json({ Attractions: Attractions });
  } catch (err) {
    console.log(err);
    return next(new AppError(FAILURE, 404));
  }
};
const GetAllAttractions = async (req, res, next) => {
  try {
    const Attractions = await getAllAttractions();

    res.status(200).json({ Attractions: Attractions });
  } catch (error) {
    return next(new AppError(FAILURE, 404));
  }
};
module.exports = {
  addAttraction,
  getAllAttraction,
  getAttraction,
  updateAttraction,
  deleteAttraction,
  SetUrls,
  getAttractionByCategory,
  getAttractionBySubcategory,
  GetAllAttractions,
};
