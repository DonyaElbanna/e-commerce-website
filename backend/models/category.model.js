const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, "Please Provide city!"],
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


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;