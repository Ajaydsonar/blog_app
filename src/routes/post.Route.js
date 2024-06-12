import { Router } from "express";
import { verifyToken } from "../controllers/user.Controller.js";
import {
  createPost,
  getAllPostData,
  getSinglePostData,
  updatePost,
} from "../controllers/post.Controller.js";

const router = Router();

router.route("/create").post(verifyToken, createPost);
router.route("/show").get(verifyToken, getAllPostData);
router.route("/show/:id").get(verifyToken, getSinglePostData);
router.route("/update/:id").put(verifyToken, updatePost);

export default router;
