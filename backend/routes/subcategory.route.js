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

router.post("", upload.single("image"), addSubcategory);

router.get("", getAllSubcategories);

router.get("/:id", getSingleSubcategory);

router.put("/:id", editSubcategory);

router.delete("/:id", deleteSubcategory);

module.exports = router;
