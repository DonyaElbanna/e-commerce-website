const mongoose = require("mongoose");
const { Schema } = mongoose;
const AttractionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String, //boolen
      enum: ["available", "notAvailable"],
      default: "available",
      required: [true, "please provide status"],
    },
    childAge: {
      type: String,
      required: [true, "please provide child min age"],
    },
    duration: {
      required: [true, "please provide duration time"],
      type: String,
    },
    childAvailable: {
      type: Boolean,
      required: [true, "please provide if child available"],
    },
    AdultPrice: {
      type: Number,
      required: [true, "please provide adult price"],
    },
    ChildPrice: {
      type: Number,
      required: [true, "please provide child price"],
    },
    Images: {
      type: Array,
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    included: {
      type: [String],
      required: true,
    },
    excluded: {
      type: [String],
      required: true,
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
AttractionSchema.virtual("review", {
  ref: "Review",
  localField: "_id",
  foreignField: "attraction",
}); //get All Review related to attraction
module.exports = mongoose.model("Attraction", AttractionSchema);
