const authService = require("../services/auth.service");
const signin = async (req, res, next) => {
  console.log(req.body)
  try {
    const data = await authService.signin(req.body);
    const accessToken = await authService.generateAccessToken(data);
    return res
      .cookie("auth", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: data });
  } catch (error) {
    next(error);
  }
};
const sendVerification = async (req, res, next) => {
  await authService
    .sendVerification(req.query, req.query.type)
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => next(err));
};
const resetPassword = async (req, res, next) => {
  try {
    console.log(res.locals.verificationToken);
    req.userId = res.locals.verificationToken._id;
    const data = await authService.resetPassword(req);
    const accessToken = await authService.generateAccessToken(data);
    return res
      .cookie("auth", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: data });
  } catch (error) {
    next(error);
  }
};
const forgetPassword = async (req, res, next) => {
  await authService
    .sendVerification(req.query, "reset")
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => next(err));
};
module.exports = {
  signin,
  sendVerification,
  resetPassword,
  forgetPassword,
};
