const Guest = require("../models/guest.model");
const {
  addNewGuest,
  editGuest,
  getAllNewGuests,
  getNewGuest,
  deletingGuest,
} = require("../services/guest.service");
const { generateAccessTokenGuest } = require("../services/auth.service");
const AppError = require("../utils/AppError.util");

const addGuest = async (req, res) => {
  const guest = await addNewGuest();
  console.log(guest)
  const accessToken = await generateAccessTokenGuest(guest);
  res
    .cookie("auth", accessToken, {
      maxAge: 60 * 1000 * 60 * 24 * 365,
    })
    .status(201)
    .json({ guest: guest });
};

const getGuest = async (req, res, next) => {
  const guest = await getNewGuest({ _id: req.params.id });
  if (!guest) {
    return next(new AppError("No guest found with this id", 404));
  }
  res.status(201).json({ guest: guest });
};

const getAllGuests = async (req, res, next) => {
  const guests = await getAllNewGuests();
  res.status(201).json({ guests: guests });
};

const updateGuest = async (req, res, next) => {
  const guest = await editGuest({ _id: req.params.id }, req.body);
  if (!guest) {
    return next(new AppError("No guest found with this id", 404));
  }
  res.status(201).json(guest + " is updated successfully");
};

const deleteGuest = async (req, res, next) => {
  const guest = await deletingGuest({ _id: req.params.id });
  if (!guest) {
    return next(new AppError("No guest found with this id", 404));
  }
  res.status(201).json("Guest Removed Successfully");
};

module.exports = { addGuest, getGuest, getAllGuests, updateGuest, deleteGuest };
