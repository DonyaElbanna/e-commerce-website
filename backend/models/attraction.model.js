const mongoose = require("mongoose");
const { Schema } = mongoose;
const AttractionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
    },
    CategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    status: {
      type: String, // boolen
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
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

module.exports = mongoose.model("Attraction", AttractionSchema);
