import { Router } from "express";
import {
  loginUser,
  registerUser,
  verifyToken,
} from "../controllers/user.Controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secure routes
export default router;
