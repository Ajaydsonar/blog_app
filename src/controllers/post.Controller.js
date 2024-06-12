import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { connection } from "./user.Controller.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const userID = req.user.user_id;
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

// get post data

const getAllPostData = asyncHandler(async (req, res) => {
  const getAllPost = "SELECT * FROM Posts";

  const [results] = await (await connection).execute(getAllPost);

  res.status(200).json(new ApiResponse(200, results, "All Post Data"));
});

// get single post data
const getSinglePostData = asyncHandler(async (req, res) => {
  const postID = Number(req.params.id);
  if (!postID) {
    throw new ApiError(400, "Please Enter the Post ID");
  }
  const getSinglePost = "SELECT * FROM Posts WHERE post_id = ?";
  const [results] = await (await connection).execute(getSinglePost, [postID]);

  if (results.length === 0) {
    throw new ApiError(400, "Post Not Found");
  }
  res.status(200).json(new ApiResponse(200, results[0], "Single Post Data"));
});

// update post
const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const postID = Number(req.params.id);
  const user_id = req.user.user_id;

  if (!user_id) {
    throw new ApiError(400, "Please Login");
  }

  if (!postID || isNaN(postID)) {
    throw new ApiError(400, "Please Enter the valid Post ID");
  }

  //check if post belongs to user
  const checkQuery = "SELECT * FROM Posts WHERE post_id = ? AND user_id = ?";

  const [checkUserBelongstoPost] = await (
    await connection
  ).execute(checkQuery, [postID, user_id]);

  if (checkUserBelongstoPost.length === 0) {
    throw new ApiError(400, "Post does not belong to you");
  }

  const isPostExist = "SELECT * FROM Posts WHERE post_id = ?";
  const [post] = await (await connection).execute(isPostExist, [postID]);

  if (post.length === 0) {
    throw new ApiError(400, "Post Not Found");
  }

  if (
    title === undefined ||
    content === undefined ||
    !(title.trim() && content.trim())
  ) {
    throw new ApiError(400, "Please Enter the Title And Content");
  }

  const updatePostQuery =
    "UPDATE Posts SET title = ?, content = ? WHERE post_id = ?";
  const [results] = await (
    await connection
  ).execute(updatePostQuery, [title, content, postID]);

  res
    .status(200)
    .json(new ApiResponse(200, results, "Post Updated Successfully"));
});

export { createPost, getAllPostData, getSinglePostData, updatePost };
