import express from "express";
import { register, login, followUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/login", login);
router.get("/follow/:id", isAuthenticated, followUser);

export default router;
