const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const {
  extractJwtFromHeader,
} = require("../middlewares/tokenextractor.middleware");
router.post("/signin", authController.signin);
router.post("/reset", extractJwtFromHeader, authController.resetPassword);
router.post("/forgetPassword", authController.forgetPassword);

module.exports = router;
