const express = require("express");
const router = express.Router();

const {
  addOrder,
  getAllOrders,
  getSingleOrder,
  editOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const { extractJwtAdminFromCookie, extractJwtFromCookie } = require("../middlewares/tokenextractor.middleware");
router.post("",extractJwtFromCookie, addOrder);
router.get("/:id", getSingleOrder);

//admin route
router.get("",extractJwtAdminFromCookie,getAllOrders);
router.patch("/:id",extractJwtAdminFromCookie, editOrder);
router.delete("/:id/:orderID", extractJwtAdminFromCookie ,deleteOrder);

module.exports = router;
