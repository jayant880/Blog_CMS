import Post from "../DB/models/postModel.js";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { tag } = req.query;
    const query = tag ? { tags: tag as string } : {};
    const posts = await Post.find(query)
      .populate("author", "username")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ message: "posts fetched successfully", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    console.log(tags);
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const post = new Post({ title, content, author: req.user.id });
    if (tags) post.tags = tags;
    await post.save();
    return res.send({ message: "post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("author", "username");
    if (!post) return res.status(404).json({ message: "post not found" });
    return res.status(200).json({ message: "post fetched successfully", post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    return res.status(200).json({ message: "post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: "post deleted successfully", post });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Post.distinct("tags");
    return res.status(200).json({ message: "tags fetched successfully", tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
