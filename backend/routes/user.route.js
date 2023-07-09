const express = require("express");
const router = express.Router();
const {
  Schemas,
  RequestValidator,
} = require("../middlewares/requestvalidator.middleware");
const {
  signup,
  getSingleUser,
  editUser,
  deleteUser,
  getAllUsers,
  toggleWishlist,
  toggleBlock,
  changeUserRole,
  getUserOrders,
  adminAddUser,
} = require("../controllers/user.controller");
const {
  extractJwtFromCookie,
  extractJwtAdminFromCookie,
} = require("../middlewares/tokenextractor.middleware");

router.post("", signup);

router.get("/:id", extractJwtFromCookie, getSingleUser);
router.get("/orders/:id", extractJwtFromCookie, getUserOrders);
// admin route
router.post("/add", extractJwtAdminFromCookie, adminAddUser);

// user route
router.post(
  "/:id",
  RequestValidator(Schemas.user.wishListAdd),
  extractJwtFromCookie,
  toggleWishlist
);

//admin route
router.get("", extractJwtAdminFromCookie, getAllUsers);
router.delete("/:id", extractJwtAdminFromCookie, deleteUser);
router.put("/:id", extractJwtAdminFromCookie, editUser);
router.get("/block/:id", extractJwtAdminFromCookie, toggleBlock);
router.get("/role/:id", extractJwtAdminFromCookie, changeUserRole);

module.exports = router;
