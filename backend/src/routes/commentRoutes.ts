import { Router } from "express";
import {
  createComment,
  getCommentsByPostId,
} from "../controllers/commentController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:id", getCommentsByPostId);
router.post("/:id", auth, createComment);

export default router;
