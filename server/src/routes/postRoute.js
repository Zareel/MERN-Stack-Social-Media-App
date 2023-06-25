import express from "express";
import {
  getPosts,
  createPost,
  likeAndUnlike,
  deletePost,
} from "../controllers/postController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

//localhost:5000/api/v1/post/upload
router.get("/", getPosts);
router.post("/post/upload", isAuthenticated, createPost);
//localhost:5000/api/v1/post/"post id"
router.get("/post/:id", isAuthenticated, likeAndUnlike);
//localhost:5000/api/v1/delete/"post id"
router.delete("/delete/:id", isAuthenticated, deletePost);

export default router;
