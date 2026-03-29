import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", schema);

export default Post;
