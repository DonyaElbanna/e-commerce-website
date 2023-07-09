const jwt = require("jsonwebtoken");
const { config } = require("../config/default.config");
const {
  NOT_FOUND,
  UNAUTHORIZED_ACCESS,
  Adminonly,
} = require("../utils/namespace.util");
const axios = require("axios");
const xml2js = require("xml2js");
const headers = {
  headers: { "Content-Type": "text/xml" },
};
exports.extractJwtFromCookie = (req, res, next) => {
  const path = req.path.split("/").at(-1);
  const token =
    path === "refresh" || path === "signout"
      ? // ? req.signedCookies?.persist
        // : req.signedCookies?.auth;
        req.cookies?.persist
      : req.cookies?.auth;
  // console.log('path', req.cookies.auth);
  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        const err = new Error(NOT_FOUND);
        err.status = 404;
        next(err);
      } else {
        res.locals.encodedToken = token;
        res.locals.decodedToken = decoded;
        // console.log("decoded", decoded._id);
        next();
      }
    });
  } else {
    const err = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    console.log("token err", err);
    next(err);
  }
};
exports.extractJwtAdminFromCookie = (req, res, next) => {
  const path = req.path.split("/").at(-1);
  const token =
    path === "refresh" || path === "signout"
      ? req.cookies?.persist
      : req.cookies?.auth;
  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        const err = new Error(NOT_FOUND);
        err.status = 404;
        next(err);
      } else {
        if (decoded.role !== "admin") {
          const err = new Error("Unauthorized access admin only allow ");
          err.status = 404;
          next(err);
        }
        res.locals.encodedToken = token;
        res.locals.decodedToken = decoded;
        next();
      }
    });
  } else {
    const err = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    next(err);
  }
};
// exports.extractTransactionTokenFromCookie = async(req, res, next) => {
//   const TransactionToken =req.cookies.TransToken
//   if (TransactionToken) {
//     try {
//      await paymentService.VerfiyToken(TransactionToken)
//     } catch (error) {
//       next(error)
//     }
//   } else {
//     const err = new Error(UNAUTHORIZED_ACCESS);
//     err.status = 401;
//     next(err);
//   }
//   next()
// };
exports.extractTransactionTokenFromCookie = async (req, res, next) => {
  const TransactionToken = req.signedCookies?.TransToken || req.body.TransToken;
  if (TransactionToken) {
    try {
      const TransToken = await TransactionModel.findOne({
        TransactionToken: TransactionToken,
      });
      const response = await axios.post(
        config.DPOinfo.Endpoint,
        `<API3G>
      <CompanyToken>${config.DPOinfo.TestCompanyToken}</CompanyToken>
      <Request>verifyToken</Request>
      <TransactionToken>${TransactionToken}</TransactionToken>
    </API3G>`,
        headers
      );
      xml2js.parseString(response.data, (error, result) => {
        if (error) {
          throw error;
        }
        if (result.API3G.Result[0] !== "000" || TransToken.bookingId) {
          const error = new Error(result.API3G.Result[0]);
          error.status = 409;
          throw error;
        }
        next();
      });
    } catch (error) {
      next(error);
    }
  } else {
    const err = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    next(err);
  }
};
exports.extractJwtFromHeader = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || req.body.token;
  console.log(token);
  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        console.log("heloo from medlel ware ");
        const err = new Error(error);
        err.status = 404;
        next(err);
      } else {
        res.locals.verificationToken = decoded;
        next();
      }
    });
  } else {
    const err = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    next(err);
  }
};
