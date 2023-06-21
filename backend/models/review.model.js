const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, "A Review Must Have a review"],
    },
    rating: {
      type: Number,
      min: [1, "Rating Must be Greater than or equal to 1"],
      max: [5, "Rating Must be Less than or equal to 5"],
    },
    attraction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attraction",
      required: [true, "Review Must Belong To An attraction"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review Must Belong To a User"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
    id: false,
  }
);
module.exports = mongoose.model("Review", reviewSchema);
