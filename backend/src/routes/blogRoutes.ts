import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controllers/blogController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.put("/:id", updatePostById);
router.delete("/:id", deletePostById);

export default router;
