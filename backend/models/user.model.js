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
      unique: true,
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
      enum: ["admin", "user", "guest"],
      default: "guest",
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attraction",
      },
    ],
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

UserSchema.pre("save", async function () {
  const currentDocument = this;
  const modifiedCheck = currentDocument.isModified("password");
  if (modifiedCheck) {
    const hashedPassword = await bcrypt.hash(currentDocument.password, 10);
    currentDocument.password = hashedPassword;
  }
});

module.exports = mongoose.model("User", UserSchema);
