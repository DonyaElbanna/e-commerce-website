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
const {
  extractJwtAdminFromCookie,
} = require("../middlewares/tokenextractor.middleware");
const router = express.Router();


router.get("/", getAllAttraction);
router.get("/all", GetAllAttractions);
router.get("/:id", getAttraction);
router.get("/category/:id", getAttractionByCategory);
router.get("/subcat/:id", getAttractionBySubcategory);

//admin route
router.post(
  "/",
  extractJwtAdminFromCookie,
  upload.array("image"),
  addAttraction
);
router.patch(
  "/upload/:id",
  extractJwtAdminFromCookie,
  uploadToMulter,
  uploadPP,
  SetUrls
);
router.put("/:id", extractJwtAdminFromCookie, updateAttraction);
router.delete("/:id", extractJwtAdminFromCookie, deleteAttraction);

module.exports = router;
