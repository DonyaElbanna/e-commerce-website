const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    attraction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attraction",
      required: [true, "An attraction Must Belong To An order"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A user Must Belong To an order"],
    },
    adultCount: {
      type: Number,
    },
    childCount: {
      type: Number,
    },
    AdultTotalPrice: {
      type: Number,
    },
    ChildTotalPrice: {
      type: Number,
    },
    travelDate: {
      type: Date,
      required: [true, "A date Must Belong To an order"],
    },
    totalPrice: {
      type: Number,
    },
    // email:{
    //     type:String,
    //     required:[true, "Email Must Belong To a Order"]
    // }
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
