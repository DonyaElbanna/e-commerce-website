const express = require("express");
const router = express.Router();

const {
  signup,
  getSingleUser,
  editUser,
  deleteUser,
  getAllUsers,
  toggleWishlist,
} = require("../controllers/user.controller");

router.post("", signup);

router.get("/:id", getSingleUser);

router.get("", getAllUsers);

router.patch("/:id", editUser);

router.delete("/:id", deleteUser);

router.post("/:id", toggleWishlist);

module.exports = router;
