import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { connection } from "./user.Controller.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
  const userID = req.userId;
});
