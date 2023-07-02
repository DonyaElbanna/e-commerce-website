const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { config } = require("../config/default.config");
const mailerService = require("./mailer.service");
const { ErrorHandler } = require("../lib/errorhandler.lib");
const AppError = require("../utils/AppError.util");
const { INVALID_CREDENTIALS } = require("../utils/namespace.util").namespace;

const signin = async (payload) => {
  try {
    const user = await userModel
      .findOne({
        $and: [
          { $or: [{ username: payload.username }, { email: payload.email }] },
        ],
      })
      .select("+password");
    if (!user) {
      const err = new AppError(INVALID_CREDENTIALS, 409);
      throw err;
    }
    const isPasswordMatch = await user.comparePassword(payload.password);
    if (!isPasswordMatch) {
      const err = new AppError(INVALID_CREDENTIALS, 409);
      throw err;
    }
    user.password = "";
    return user;
  } catch (error) {
    throw error;
  }
};

const sendVerification = async (data, type) => {
  try {
    const user = await userModel.findOne({ email: data.email });
    if (user && type === "verify") {
      const verificationToken = await generateVerificationToken(user);
      // Modify the template later
      const payload = {
        senderName: "Tickets",
        senderEmail: "mahmoudalmazoon@outlook.com",
        receiverName: `${user.username}`,
        receiverEmail: data?.emailAddress,
        subject: "Verify Account",
        message: `Click <a href='${config.client.uri}/verify?token=${verificationToken}'>here</a> to verify your account.`,
      };
      await mailerService.mailer(payload);
    } else if (user && type === "reset") {
      const verificationToken = await generateVerificationToken(user);
      // Modify the template later
      const payload = {
        senderName: " Tickets",
        senderEmail: "mahmoudalmazoon@outlook.com",
        receiverName: `${user.username}`,
        receiverEmail: data?.emailAddress,
        subject: "Reset Password",
        message: `Click <a href='${config.client.uri}/reset?token=${verificationToken}'>here</a> to reset your password.`,
      };
      await mailerService.mailer(payload);
    } else {
      const error = new Error();
      error.status = 404;
      error.message = "NO_USER_FOUND";
      throw error;
    }
  } catch (error) {
    await ErrorHandler(error);
  }
};

const generateAccessToken = async (user) => {
  console.log("user");
  console.log(user);
  try {
    return jwt.sign(
      {
        _id: user._id,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );
  } catch (error) {
    throw error;
  }
};

const verifyUser = async (_id) => {
  try {
    return await User.findByIdAndUpdate(_id, { isVerified: true });
  } catch (error) {
    throw error;
  }
};

const generateVerificationToken = async (user) => {
  try {
    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: "15m",
      }
    );

    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateAccessToken,
  generateVerificationToken,
  verifyUser,
  signin,
  sendVerification,
};
