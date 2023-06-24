const express = require("express");
const router = express.Router();

const {
  addSubcategory,
  getAllSubcategories,
} = require("../controllers/subcategory.controller");
const upload = require("../utils/multer.util");

router.post("", upload.single("image"), addSubcategory);

router.get("", getAllSubcategories);

// router.patch("/:id", editOrder);

// router.delete("/:id", deleteOrder);

module.exports = router;
