const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttractionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    childAge: {
      type: String,
      required: true,
    },
    duration: {
      required: true,
      type: String,
    },
    childAvailable: {
      type: Boolean,
      required: true,
    },
    AdultPrice: {
      type: Number,
    },
    ChildPrice: {
      type: Number,
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
