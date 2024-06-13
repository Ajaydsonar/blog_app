import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateEmail,
  updatePassword,
  updateUsername,
  verifyToken,
} from "../controllers/user.Controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secure routes
router.route("/update/email").put(verifyToken, updateEmail);
router.route("/update/username").put(verifyToken, updateUsername);
router.route("/update/password").put(verifyToken, updatePassword);
router.route("/logout").post(verifyToken, logoutUser);
router.route("/profile/:id").get(verifyToken, getUserProfile);
export default router;
