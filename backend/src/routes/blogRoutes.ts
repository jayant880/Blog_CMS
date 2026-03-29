import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controllers/blogController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.get("/:id", getPostById);
router.put("/:id", auth, updatePostById);
router.delete("/:id", auth, deletePostById);

export default router;
