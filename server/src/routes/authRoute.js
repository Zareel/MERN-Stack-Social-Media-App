import express from "express";
import { register, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/login", login);

export default router;
