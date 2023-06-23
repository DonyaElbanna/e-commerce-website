const express = require("express");
const router = express.Router();

const {
  addOrder,
  getAllOrders,
  getSingleOrder,
  editOrder,
  deleteOrder,
} = require("../controllers/order.controller");

router.post("/:id", addOrder);

router.get("", getAllOrders);

router.get("/:id", getSingleOrder);

router.patch("/:id", editOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
