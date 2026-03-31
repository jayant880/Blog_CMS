import { Request, Response } from "express";
import { Comment } from "../DB/models/commentModel.js";

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { id: postId } = req.params;
    const comments = await Comment.find({ postId }).populate(
      "author",
      "username",
    );
    if (!comments) {
      return res.status(404).json({ message: "No comments found" });
    }
    return res
      .status(200)
      .json({
        message: "Comments fetched successfully",
        comments: comments ? comments : [],
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id: postId } = req.params;
    const { comment } = req.body;
    if (!postId || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newComment = new Comment({ postId, author: userId, comment });
    await newComment.save();
    return res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
