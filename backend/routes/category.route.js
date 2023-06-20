const express = require("express");
const {
  getAllCategories,
  createCategory,
  getCategoryByID,
  editCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const router = express.Router();
// const Joi = require("joi");

// Get all categories
router.get("/", getAllCategories);

// Get category by ID
router.get("/:id", getCategoryByID);

// create category
router.post("/", createCategory);

// update category
router.patch("/:id", editCategory);

// // create category
router.delete("/:id", deleteCategory);

module.exports = router;
