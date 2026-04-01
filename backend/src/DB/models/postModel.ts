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
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);
schema.index({ title: "text", content: "text" });

const Post = mongoose.model("Post", schema);

export default Post;
