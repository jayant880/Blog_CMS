import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
} from "../controller/blogController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.put("/:id", updatePostById);

export default router;
