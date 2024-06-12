import { Router } from "express";
import {
  loginUser,
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

export default router;
