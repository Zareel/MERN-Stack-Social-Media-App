import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: [true, "Name should not exceed 50 chars"],
    },
    avatar: {
      publilc_id: String,
      url: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must have at least 6 characters"],
      select: false,
    },
    posts: [
      {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjecId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjecId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
