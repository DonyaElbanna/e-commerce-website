const express = require("express");
const router = express.Router();
const {
  getSingleUser,
  editUser,
  deleteUser,
} = require("../controllers/user.controller");
const validate = require("../utils/validation");

router.get("/:id", getSingleUser);

router.patch("/:id", validate, editUser);

router.delete("/:id", deleteUser);

module.exports = router;
