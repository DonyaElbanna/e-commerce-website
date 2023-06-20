const User = require("../models/user.model");

const signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error("This email is already registered");
    error.status = 409;
    return next(error);
  }
  const newUser = await User.create({ email, username, password });
  newUser.password = undefined;
  res.status(201).json(newUser);
};

module.exports = { signup };
