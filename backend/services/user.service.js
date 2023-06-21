const User = require("../models/user.model");
const AppError = require("../utils/AppError.util");
const { DUPLICATE_EMAIL, DUPLICATE_USERNAME, NOT_FOUND } =
  require("../utils/namespace.util").namespace;

const add = async (payload, next) => {
  try {
    const userExists = await User.find({ email: payload.email });
    if (userExists.length !== 0) {
      return next(new AppError(DUPLICATE_EMAIL, 409));
    }
    // duplicate username error??
    const user =   new User (payload);
    await user.save()
    console.log(user)
    user.password = undefined;
    return user;
  } catch (err) {
    console.log(err)
    return next(new AppError(NOT_FOUND, 404));
  }
};

const getUser = async (id, next) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError(NOT_FOUND, 404));
    }
    return user;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const edit = async (payload, id, next) => {
  try {
    const editedUser = await User.findByIdAndUpdate(id, payload, {
      upsert: true,
      new: true,
    });
    return editedUser;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const remove = async (id, next) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(new AppError(NOT_FOUND, 404));
    }
    return user;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};
const getAllUser = async()=>{
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
}
module.exports = { add, getUser, edit, remove,getAllUser};
