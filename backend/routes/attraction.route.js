const express = require("express");
const {
  addAttraction,
  getAllAttraction,
  getAttraction,
  updateAttraction,
  deleteAttraction,
} = require("../controllers/attraction.controller");

const router = express.Router();

router.post("/", addAttraction);

router.get("/", getAllAttraction);

router.get("/:id", getAttraction);

router.put("/:id", updateAttraction);

router.delete("/:id", deleteAttraction);

module.exports = router;
