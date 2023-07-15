const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { config } = require("../config/default.config");
const mailerService = require("./mailer.service");
const { ErrorHandler } = require("../lib/errorhandler.lib");
const AppError = require("../utils/AppError.util");
const { INVALID_CREDENTIALS } = require("../utils/namespace.util").namespace;

const signin = async (payload) => {
  console.log(payload)
  try {
    const user = await userModel
      .findOne({ email: payload.email },
  )
      .select("+password");
      console.log(user)
    if (!user) {
      const err = new AppError(INVALID_CREDENTIALS, 409);
      throw err;
    }
    const isPasswordMatch = await user.comparePassword(payload.password);
    console.log(isPasswordMatch)
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
    const user = await userModel.findOne({ email: data.emailAddress });
    console.log("asmaa", user);
    if (user && type === "verify") {
      const verificationToken = await generateVerificationToken(user);
      // Modify the template later
      const payload = {
        senderName: "Tickets",
        senderEmail: "toursguied@outlook.com",
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
        senderEmail: "toursguied@outlook.com",
        receiverName: `${user.username}`,
        receiverEmail: data?.emailAddress,
        subject: "Reset Password",
        message: `Click <a href='${config.client.uri}/reset?token=${verificationToken}'>here</a> to reset your password.`,
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
  try {
    return jwt.sign(
      {
        _id: user._id,
        role: user.role,
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
const generateAccessTokenGuest = async (user) => {
  try {
    return jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: "365d",
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

const resetPassword = async (payload) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: payload.userId },
      { password: payload.body.password }
    );
    if (!user) {
      const err = new AppError(INVALID_CREDENTIALS, 409);
      throw err;
    }
    return user;
  } catch (error) {
    throw error;
  }
};
const generateRefreshToken = async (user) => {
  try {
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: "1y",
      }
    );
    const isRefreshTokenExist = await Token.exists({
      userId: user._id,
    });
    if (!isRefreshTokenExist) {
      const refreshToken = new Token();
      refreshToken.userId = user._id;
      refreshToken.token = token;
      await refreshToken.save();
    }
    return token;
  } catch (error) {
    await ErrorHandler(error);
  }
};
module.exports = {
  generateAccessToken,
  generateVerificationToken,
  verifyUser,
  signin,
  sendVerification,
  resetPassword,
  generateRefreshToken,
  generateAccessTokenGuest,
};
