const authService = require("../services/auth.service");
const signin = async (req, res, next) => {
  try {
    const data = await authService.signin(req.body);
    const accessToken = await authService.generateAccessToken(data);
    const refreshToken = await authService.generateAccessToken(data);
    return res
      .cookie("auth", accessToken, {
        // secure: true,
        // signed: true,
        // httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // domain: config.server.cookie.domain
      })
      .cookie("persist", refreshToken, {
        // secure: true,
        // signed: true,
        // httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        // domain: config.server.cookie.domain
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
    .sendVerification(req.body, "reset")
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  signin,
  sendVerification,
  resetPassword,
  forgetPassword,
};
