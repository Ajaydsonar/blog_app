import { Router } from "express";
import { verifyToken } from "../controllers/user.Controller.js";
import { createPost } from "../controllers/post.Controller.js";

const router = Router();

router.route("/create").post(verifyToken, createPost);

export default router;
