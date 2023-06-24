const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  getCategoryByID,
  editCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const upload = require("../utils/multer.util");

router.post("/", upload.single("image"), createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryByID);

router.patch("/:id", editCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
