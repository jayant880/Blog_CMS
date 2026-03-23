import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
} from "../controller/blogController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);

export default router;
