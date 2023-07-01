const mongoose = require("mongoose");

const { Schema } = mongoose;

const guestSchema = new Schema({
  userName: {
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
      ref: "Attraction",
    },
  ],
  position: {
    type: String,
    default: "guest",
  },
});

const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
