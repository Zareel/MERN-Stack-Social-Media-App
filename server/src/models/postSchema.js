import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption: String,
    image: {
      public_id: String,
      url: String,
    },
    image: {
      public_id: String,
      url: String,
    },
    owner: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "User",
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
