const express = require("express");
const {
  addAttraction,
  getAllAttraction,
  getAttraction,
  updateAttraction,
  deleteAttraction,
  SetUrls,
} = require("../controllers/attraction.controller");
const { uploadToMulter, uploadPP } = require("../utils/multerConfig");

const router = express.Router();

router.post("/", addAttraction);

router.patch("/upload/:id", uploadToMulter, uploadPP, SetUrls);

router.get("/", getAllAttraction);

router.get("/:id", getAttraction);

router.put("/:id", updateAttraction);

router.delete("/:id", deleteAttraction);

module.exports = router;
