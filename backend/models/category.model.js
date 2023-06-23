const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Please Provide type !"],
    },
    image: {
      type: String,
      required: [true, "Please Provide Image Url!"],
    },
    city: {
      type: String,
      required: [true, "Please Provide city!"],
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

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
