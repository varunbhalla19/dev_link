const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    title: String,
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

const Postmodel = mongoose.model("Posts", PostSchema);

module.exports = Postmodel;
