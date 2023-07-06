const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Please Provide a type!"],
    },
    image: {
      type: String,
      required: [true, "Please Provide Image Url!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const Category = mongoose.model("Subcategory", subcategorySchema);

module.exports = Category;

