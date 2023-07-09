const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const {
  extractJwtFromHeader,
} = require("../middlewares/tokenextractor.middleware");
const {
  RequestValidator,
  Schemas,
} = require("../middlewares/requestvalidator.middleware");
router.post(
  "/signin",
  RequestValidator(Schemas.auth.signin),
  authController.signin
);
router.post(
  "/reset",
  RequestValidator(Schemas.auth.confirmAndModifyPassword),
  extractJwtFromHeader,
  authController.resetPassword
);
router.post(
  "/forgetPassword",
  RequestValidator(Schemas.auth.forgetpassword),
  authController.forgetPassword
);

module.exports = router;
