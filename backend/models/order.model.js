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
    },
    guest:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
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
    //attraction integration 
    bookingRefId: {
      type: String,
      required: true,
    },
    barCodeImagePath: {
      type: String,
      required: true,
    },
    ticketNumber: {
      type: String,
      required: true,
    },
    //website logo 
    LogoImage: {
      type: String,
      default:"https://res.cloudinary.com/dc2rtsfhi/image/upload/v1689256910/logo1_cen4ps.jpg"
    },
    tourname:{
      type:String,
      required:true
    },
    MainImage:{
      type:String,
      required:true
    },
    email:{
        type:String,
        required:[true, "Email Must Belong To a Order"]
    }
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
