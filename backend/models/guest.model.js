const mongoose = require("mongoose");

const { Schema } = mongoose;

const guestSchema = new Schema({
  username: {
    type: String,
    default: "guest",
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Attraction",
    },
  ],
  avatar: {
    type: String,
    default: "https://shorturl.at/lorFV",
  },
  role: {
    type: String,
    default: "guest",
  },
},  {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
});
guestSchema.virtual("order", {
  ref: "Order",
  localField: "_id",
  foreignField: "guest",
}); //get All order related to user
const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
