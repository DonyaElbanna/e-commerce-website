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
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
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
});

const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
