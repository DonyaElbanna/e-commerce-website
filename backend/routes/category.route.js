const express = require("express");
const {
  getAllCategories,
  createCategory,
  getCategoryByID,
  editCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.post("/", createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryByID);

router.patch("/:id", editCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
