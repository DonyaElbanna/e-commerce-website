const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/signup.controller");
const validate = require("../utils/validation");

router.post("", validate, signup);

module.exports = router;
