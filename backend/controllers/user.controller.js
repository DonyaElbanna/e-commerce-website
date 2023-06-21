const { add, getUser, edit, remove } = require("../services/user.service");
const AppError = require("../utils/AppError.util");
const { FAILURE } = require("../utils/namespace.util").namespace;

const signup = async (req, res, next) => {
  try {
    const newUser = await add(req.body, next);
    res.status(201).json(newUser);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    var user = await getUser(id, next);
    res.status(200).json(user);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

// only logged user can edit their info
const editUser = async (req, res, next) => {
  const { id } = req.params;

  //! implementing logged user can edit their details (requires auth)

  try {
    const user = await edit(req.body, id, next);
    res.status(202).json({ user: user });
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

// only admin or logged user can delete a user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  //! implementing only admin or logged user can delete their account (requires auth)

  try {
    const deletedUser = await remove(id, next);
    if (!deletedUser) {
      return next(new AppError(FAILURE, 404));
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

module.exports = {
  signup,
  getSingleUser,
  editUser,
  deleteUser,
};
