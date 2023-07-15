const {
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
} = require("../services/user.service");
const { signin } = require("./auth.controller");
const authService = require("../services/auth.service");

const AppError = require("../utils/AppError.util");
const { FAILURE } = require("../utils/namespace.util").namespace;

const signup = async (req, res, next) => {
  try {
    const newUser = await add(req.body, next);
    if (newUser) {
      return signin(req, res, next);
    } else {
      return next(new AppError(FAILURE, 404));
    }
    // await authService.sendVerification(newUser, "verify");
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const adminAddUser = async (req, res, next) => {
  try {
    const newUser = await adminAdd(req.body, next);
    if (newUser) {
      return res.status(201).json({ newUser });
    } else {
      return next(new AppError(FAILURE, 404));
    }
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getSingleUser = async (req, res, next) => {
  const id  = res.locals.decodedToken._id;
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
  // const { id } = req.params;
  const id = res.locals.decodedToken._id;
  // console.log(req.body)
  const Attraction = req.body.Attraction;
  try {
    const updatedUser = await addRemoveWishlist(id, Attraction, next);
    if (!updatedUser) {
      return next(new AppError(FAILURE, 404));
    }
    res.status(201).json(updatedUser);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const toggleBlock = async (req, res, next) => {
  const { id } = req.params;
  //! implementing only admin can block users
  try {
    const user = await block(id, next);
    res.status(202).json(user);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const changeUserRole = async (req, res, next) => {
  const { id } = req.params;
  //! implementing only admin can block users
  try {
    const user = await changeRole(id, next);
    res.status(202).json(user);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const getUserOrders = async (req, res, next) => {
  // const { id } = req.params;
  const id = res.locals.decodedToken._id;
  console.log(id)
  // console.log(id);
  try {
    const user = await getOrders(id, next);
    res.status(200).json(user);
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
  toggleBlock,
  changeUserRole,
  getUserOrders,
  adminAddUser,
};
