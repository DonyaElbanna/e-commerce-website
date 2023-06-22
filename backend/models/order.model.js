const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema(
  {
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
module.exports = mongoose.model("Order", orderSchema);