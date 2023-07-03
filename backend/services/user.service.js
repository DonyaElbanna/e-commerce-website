const User = require("../models/user.model");
const AppError = require("../utils/AppError.util");
const { DUPLICATE_EMAIL, NOT_FOUND } =
  require("../utils/namespace.util").namespace;

const add = async (payload, next) => {
  try {
    const userExists = await User.find({ email: payload.email });
    if (userExists.length !== 0) {
      return next(new AppError(DUPLICATE_EMAIL, 409));
    }
    // try same username, different email
    // const user = await User.create(payload);
    const user = new User(payload);
    await user.save();
    console.log(user);
    user.password = undefined;
    return user;
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getUser = async (id, next) => {
  try {
    const user = await User.findById(id)
      .populate("wishlist")
      .populate({
        path: "wishlist",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .populate({
        path: "wishlist",
        populate: {
          path: "subcategory",
          model: "Subcategory",
        },
      })
      .populate("orders")
      .exec();
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

const getAllUser = async (next) => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const addRemoveWishlist = async (id, attractionID, next) => {
  try {
    var user = await User.findById(id);

    if (!user) {
      return next(new AppError(NOT_FOUND, 404));
    } else {
      if (user.wishlist.includes(attractionID)) {
        var updatedUser = await User.findOneAndUpdate(
          { _id: id },
          { $pull: { wishlist: attractionID } },
          { upsert: true, new: true }
        ).populate("wishlist");
        console.log("was in wishlist");
      } else {
        var updatedUser = await User.findOneAndUpdate(
          { _id: id },
          { $addToSet: { wishlist: attractionID } },
          { upsert: true, new: true }
        );
        console.log("was NOT in wishlist");
      }
    }

    return updatedUser;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const block = async (id, next) => {
  try {
    const editedUser = await User.findByIdAndUpdate(
      id,
      [{ $set: { isBlocked: { $eq: [false, "$isBlocked"] } } }],
      {
        upsert: true,
        new: true,
      }
    );
    return editedUser;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const changeRole = async (id, next) => {
  const user = await User.findById(id);

  if (user.role !== "admin") {
    try {
      const editedUser = await User.findByIdAndUpdate(
        id,
        [{ $set: { role: "admin" } }],
        {
          upsert: true,
          new: true,
        }
      );
      return editedUser;
    } catch (err) {
      return next(new AppError(NOT_FOUND, 404));
    }
  } else {
    try {
      const editedUser = await User.findByIdAndUpdate(
        id,
        [{ $set: { role: "user" } }],
        {
          upsert: true,
          new: true,
        }
      );
      return editedUser;
    } catch (err) {
      return next(new AppError(NOT_FOUND, 404));
    }
  }
};

module.exports = {
  add,
  getUser,
  edit,
  remove,
  getAllUser,
  addRemoveWishlist,
  block,
  changeRole,
};
