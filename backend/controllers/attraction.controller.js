const {
  addAttract,
  getAllAttract,
  getAttract,
  UpdateAttract,
  DeleteAttract,
  SetImages,
  getAttractByCategory,
} = require("../services/attraction.service");

const addAttraction = async (req, res, next) => {
  const newAttraction = await addAttract(req.body);
  res.status(201).json({ newAttraction: newAttraction });
};
const getAllAttraction = async (req, res, next) => {
  const AllAttraction = await getAllAttract();
  res.status(200).json({ AllAttraction: AllAttraction });
};

const getAttraction = async (req, res, next) => {
  const Attraction = await getAttract(req.params.id);
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
  const Attractions = await getAttractByCategory(req.params.id);
  res.status(200).json({ Attractions: Attractions });
};

module.exports = {
  addAttraction,
  getAllAttraction,
  getAttraction,
  updateAttraction,
  deleteAttraction,
  SetUrls,
  getAttractionByCategory,
};
