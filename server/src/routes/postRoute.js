import express from "express";
import { getPosts, createPost } from "../controllers/postController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

//localhost:5000/api/v1/post/upload
router.get("/", getPosts);
router.post("/post/upload", isAuthenticated, createPost);

export default router;
