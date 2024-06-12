import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { connection } from "./user.Controller.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const userID = req.userId;
  console.log(userID);
  if (!(title.trim() && content.trim())) {
    throw new ApiError(400, "Please Enter the Title And Content");
  }
  if (!userID) {
    throw new ApiError(400, "Please Login");
  }

  const createPostQuery =
    "INSERT INTO Posts(title,content, user_id)VALUES(?,?,?)";

  const [results] = await (
    await connection
  ).execute(createPostQuery, [title, content, userID]);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { postID: results.insertId },
        "Post Created Successfully"
      )
    );
});

export { createPost };
