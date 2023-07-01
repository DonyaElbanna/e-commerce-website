const {
  add,
  getUser,
  edit,
  remove,
  getAllUser,
  addRemoveWishlist,
} = require("../services/user.service");
const authService = require("../services/auth.service");

const AppError = require("../utils/AppError.util");
const { FAILURE } = require("../utils/namespace.util").namespace;

const signup = async (req, res, next) => {
  try {
    const newUser = await add(req.body, next);
    // await authService.sendVerification(newUser, "verify");
    return res.status(201).json({ message: "create done" });
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUser(id, next);
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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUser(next);
    res.status(200).json(users);
  } catch (error) {
    return next(new AppError(FAILURE, 404));
  }
};

const toggleWishlist = async (req, res, next) => {
  const { id } = req.params;
  const attractionID = req.body.id;
  try {
    const updatedUser = await addRemoveWishlist(id, attractionID, next);
    if (!updatedUser) {
      return next(new AppError(FAILURE, 404));
    }
    res.status(201).json(updatedUser);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

module.exports = {
  signup,
  getSingleUser,
  editUser,
  deleteUser,
  getAllUsers,
  toggleWishlist,
};
