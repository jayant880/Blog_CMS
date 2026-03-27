import Post from "../DB/models/postModel.js";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

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
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const post = new Post({ title, content });
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
    const post = await Post.findById(postId);
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
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "post not found" });
    return res.status(200).json({ message: "post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
