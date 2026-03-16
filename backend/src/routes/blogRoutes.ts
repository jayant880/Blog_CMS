import { Router } from "express";
import { createPost, getPosts } from "../controller/blogController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);

export default router;
