const express = require("express");
const router = express.Router();

const {
  signup,
  getSingleUser,
  editUser,
  deleteUser,
  getAllUsers,
  toggleWishlist,
  toggleBlock,
  changeUserRole,
} = require("../controllers/user.controller");

router.post("", signup);

router.get("/:id", getSingleUser);

router.get("", getAllUsers);

router.put("/:id", editUser);

router.delete("/:id", deleteUser);

router.post("/:id", toggleWishlist);

router.get("/block/:id", toggleBlock);

router.get("/role/:id", changeUserRole);

module.exports = router;
