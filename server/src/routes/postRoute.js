import express from "express";
import {
  getPosts,
  createPost,
  likeAndUnlike,
} from "../controllers/postController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

//localhost:5000/api/v1/post/upload
router.get("/", getPosts);
router.post("/post/upload", isAuthenticated, createPost);
router.get("/post/:id", isAuthenticated, likeAndUnlike);

export default router;
