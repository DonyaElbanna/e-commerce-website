const express = require("express");
const router = express.Router();

const {
  addSubcategory,
  getAllSubcategories,
  getSingleSubcategory,
  deleteSubcategory,
  editSubcategory,
} = require("../controllers/subcategory.controller");
const upload = require("../utils/multer.util");
const { extractJwtAdminFromCookie } = require("../middlewares/tokenextractor.middleware");


router.get("", getAllSubcategories);

router.get("/:id", getSingleSubcategory);

//admin route
router.put("/:id", extractJwtAdminFromCookie,editSubcategory);
router.delete("/:id",extractJwtAdminFromCookie, deleteSubcategory);
router.post("",extractJwtAdminFromCookie, upload.single("image"), addSubcategory);

module.exports = router;
