const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    avatar: {
      type: String,
      default: "https://shorturl.at/lorFV",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attraction",
      },
    ],
    // orders: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Order", 
    //   },
    // ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch((err) => false);
};

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.password) return next();

  const salt = await bcrypt.genSalt(10);

  const hashed = await bcrypt.hash(this._update.password, salt);

  this._update.password = hashed;

  return next();
});
UserSchema.virtual("order", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
}); //get All Review related to attraction
module.exports = mongoose.model("User", UserSchema);
