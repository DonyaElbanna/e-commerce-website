const User = require("../models/user.model");
const { default: userService } = require("../services/user.service");
const AppError = require("../utils/AppError.util");
const bcrypt = require("bcrypt");

const { NOT_FOUND, FAILURE } =
  require("../utils/namespace.util").namespace;

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    var user = await User.findById(id);
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
  res.status(200).json({ user });
};

// only logged user can edit their info

// const edit = async (payload, user) => {
//   try {
//       return await User.findByIdAndUpdate(
//           user._id,
//           {
//               username: payload.username,
//               email: payload.email,
//               phoneNumber: payload.phoneNumber,
//               password:payload.password
//           },
//           {
//               upsert: true,
//               new: true
//           }
//       )
//   } catch (error) {
//       // await ErrorHandler(error)
//   }
// }
const editUser = async (req, res, next) => {
  const { id } = req.params;

  //! implementing logged user can edit their details (requires auth)
  
  try {
    const user = await userService.edit(req.body,id)
    res.status(202).json({user:user})
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

// only admin or logged user can delete a user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  //! implementing only admin or logged user can delete their account (requires auth)

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return next(new AppError(NOT_FOUND, 404));
    }
    res.status(200).json({ deletedUser });
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

module.exports = {
  getSingleUser,
  editUser,
  deleteUser,
};
