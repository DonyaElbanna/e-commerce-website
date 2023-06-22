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
    adultCount:{
        type:Number,
    },
    childCount:{
        type:Number,
    },
    AdultTotalPrice:{
        type:Number,
    },
    ChildTotalPrice:{
        type:Number
    },
    travelDate:{
        type:Date,
        required:[true, "Date Must Belong To a Order"]
    },
    totalPrice:{
        type:Number
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