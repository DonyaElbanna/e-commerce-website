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
const { extractJwtAdminFromCookie } = require("../middlewares/tokenextractor.middleware");


router.get("/", getAllCategories);
router.get("/:id", getCategoryByID);

//admin route
router.post("/", extractJwtAdminFromCookie, upload.single("image"), createCategory);
router.put("/:id", extractJwtAdminFromCookie,editCategory);
router.delete("/:id", extractJwtAdminFromCookie, deleteCategory);

module.exports = router;
