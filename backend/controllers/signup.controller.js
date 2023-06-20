const User = require("../models/user.model");
const AppError = require("../utils/AppError.util");
const {
  DUPLICATE_EMAIL,
  DUPLICATE_USERNAME,
} = require("../utils/namespace.util").namespace;

const signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  const userEmail = await User.findOne({ email });
  const userName = await User.findOne({ username });

  if (userEmail) {
    return next(new AppError(DUPLICATE_EMAIL, 409));
  } else if (userName) {
    return next(new AppError(DUPLICATE_USERNAME, 409));
  }
  const newUser = await User.create({ email, username, password });
  newUser.password = undefined;
  res.status(201).json(newUser);
};

module.exports = { signup };
