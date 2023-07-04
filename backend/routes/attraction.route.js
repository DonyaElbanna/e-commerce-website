const express = require("express");
const {
  addAttraction,
  getAllAttraction,
  GetAllAttractions,
  getAttraction,
  updateAttraction,
  deleteAttraction,
  SetUrls,
  getAttractionByCategory,
  getAttractionBySubcategory,
} = require("../controllers/attraction.controller");
const { uploadToMulter, uploadPP } = require("../utils/multerConfig");

const upload = require("../utils/multer.util");
const router = express.Router();

router.post("/", upload.array("image"), addAttraction);

router.patch("/upload/:id", uploadToMulter, uploadPP, SetUrls);

router.get("/", getAllAttraction);
router.get("/all", GetAllAttractions);

router.get("/:id", getAttraction);

router.put("/:id", updateAttraction);

router.delete("/:id", deleteAttraction);

router.get("/category/:id", getAttractionByCategory);

router.get("/subcat/:id", getAttractionBySubcategory);

module.exports = router;
