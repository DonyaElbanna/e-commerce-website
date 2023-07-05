const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransactionTokenSchema = new Schema(
  {
    TransactionToken: {
      type: String,
      required: true,
    },
    bookingInfo: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "Not Paid",
    },
    bookingId: {
      type: String,
      default: "",
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

module.exports = mongoose.model("TransactionToken", TransactionTokenSchema);
