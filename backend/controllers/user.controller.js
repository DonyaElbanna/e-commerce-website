const User = require("../models/user.model");
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
const editUser = async (req, res, next) => {
  const { id } = req.params;
  const { email, username, password } = req.body;

  //! implementing logged user can edit their details (requires auth)

  try {
    const editedUser = await User.findById(id).select("+password");
    if (editedUser.email !== email) {
      editedUser.email = email;
    }
    if (editedUser.username !== username) {
      editedUser.username = username;
    }
    if (!(await bcrypt.compare(password, editedUser.password))) {
      editedUser.password = password;
    }
    await editedUser.save();
    editedUser.password = undefined;
    res.status(200).json({ editedUser });
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
