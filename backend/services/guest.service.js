const Guest = require("../models/guest.model");
const AppError = require("../utils/AppError.util");

const addNewGuest = async () => {
  try {
    return await Guest.create({});
  } catch (error) {
    throw error;
  }
};

const getAllNewGuests = async () => {
  return await Guest.find();
};

const getNewGuest = async (payload) => {
  return await Guest.findById(payload);
};

const editGuest = async (id, payload) => {
  const editedGuest = await Guest.findByIdAndUpdate(id, payload, {
    upsert: true,
    returnDocument: "after",
    returnNewDocument: true,
  });
  return editedGuest;
};

const deletingGuest = async (payload) => {
  return await Guest.findByIdAndDelete(payload);
};

module.exports = {
  addNewGuest,
  editGuest,
  getAllNewGuests,
  getNewGuest,
  deletingGuest,
};
