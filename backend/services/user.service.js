const Guest = require("../models/guest.model");
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
    // console.log(user);
    user.password = undefined;
    return user;
  } catch (err) {
    console.log(err);
    return next(new AppError(FAILURE, 404));
  }
};

const getUser = async (id, next) => {
  try {
    const user = await User.findById(id).populate("wishlist") || await Guest.findById(id).populate("wishlist");
    // .populate("wishlist")
    // .populate({
    //   path: "wishlist",
    //   populate: {
    //     path: "category",
    //     model: "Category",
    //   },
    // })
    // .populate({
    //   path: "wishlist",
    //   populate: {
    //     path: "subcategory",
    //     model: "Subcategory",
    //   },
    // })
    // .populate("orders")
    // .exec();
    if (!user) {
      return next(new AppError(NOT_FOUND, 404));
    }
    // console.log(user)
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
    const user = (await User.findById(id)) || (await Guest.findById(id));
    let updatedUser;
    if (!user) {
      return next(new AppError(NOT_FOUND, 404));
    } else {
      if (user.wishlist.includes(attractionID)) {

           if (user.role !== "guest") {
          updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $pull: { wishlist: attractionID } },
            { upsert: true, new: true }
          ).populate("wishlist");
        } else {
          updatedUser = await Guest.findOneAndUpdate(
            { _id: id },
            { $pull: { wishlist: attractionID } },
            { upsert: true, new: true }
          ).populate("wishlist");
        }
      } else {
        if (user.role !== "guest") {
          updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $addToSet: { wishlist: attractionID } },
            { upsert: true, new: true }
          ).populate("wishlist");
        } else {
          updatedUser = await Guest.findOneAndUpdate(
            { _id: id },
            { $addToSet: { wishlist: attractionID } },
            { upsert: true, new: true }
          ).populate("wishlist");
        }
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

const getOrders = async (id, next) => {
  try {
    const user =await Guest.findById(id).populate("order") ||  await User.findById(id).populate("order")
    if (!user) {
      return next(new AppError(NOT_FOUND, 404));
    }
    return user;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const adminAdd = async (payload, next) => {
  try {
    const userExists = await User.findOne({ email: payload.email });
    if (userExists) {
      return next(new AppError(DUPLICATE_EMAIL, 409));
    }
    const user = await User.create(payload);
    // await user.save();
    user.password = undefined;
    return user;
  } catch (err) {
    return next(new AppError(FAILURE, 404));
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
  getOrders,
  adminAdd,
};
