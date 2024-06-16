import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import createConnection from "../db/connectionDB.js";
import { hashPassword } from "../utils/hashPassword.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const connection = createConnection();

const generateToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const options = {
  httpOnly: true,
  secure: true,
};
// register user
const registerUser = asyncHandler(async (req, res) => {
  // get the username,email and password from user
  // apply validation
  // check if user already exists
  // create user

  const { username, email, password } = req.body;

  if (
    [email, username, password].some(
      (field) => field?.trim() === "" || field === undefined
    )
  ) {
    throw new ApiError(
      400,
      "All input username, email and password correctly..."
    );
  }

  try {
    const userAlreadyExistQuery =
      "SELECT * FROM Users WHERE username = ? OR email = ?";

    const [results] = await (
      await connection
    ).execute(userAlreadyExistQuery, [username, email]);

    if (results.length > 0) {
      throw new ApiError(409, "User already exists");
    }

    const hashPass = await hashPassword(password);

    const userInsertQuery =
      "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";

    const [insertResult] = await (
      await connection
    ).execute(userInsertQuery, [username, email, hashPass]);

    res
      .status(201)
      .json(new ApiResponse(200, insertResult, "User signup successfully"));
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
});

//login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email.trim() && password)) {
    throw new ApiError(400, "Please Enter the Email and Password Correctly");
  }

  try {
    const findUserQuery = "SELECT * FROM Users WHERE email = ?";

    const [results] = await (await connection).execute(findUserQuery, [email]);

    if (results.length === 0) {
      throw new ApiError(404, "User not Found");
    }

    const user = results[0];

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(404, "Invalid Password");
    }

    const payload = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.cookie("token", token, options).status(200).send({ auth: true, token });
  } catch (error) {
    res
      .status(error.statusCode)
      .json(new ApiError(error.statusCode, `${error.message}`));
  }
});

// logout user

const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookies("token", options)
    .json(new ApiResponse(200, { logout: true }, "User logout Successfully!"));
});

//verify token
const verifyToken = asyncHandler((req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(409, "No Token Provided");

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = decoded;
  next();
});

const updateUsername = asyncHandler(async (req, res) => {
  // get username
  //validate username
  // update username
  //send response

  const { username } = req.body;
  const userID = req.user.user_id;
  console.log("ok 1 :", req.user);
  if (!username) throw new ApiError(400, "Please Provide the username");

  const checkUserExistSQL = "SELECT * FROM Users WHERE username = ?";
  const [checkUserExist] = await (
    await connection
  ).execute(checkUserExistSQL, [username]);

  console.log("checkUserExist :", checkUserExist);
  if (checkUserExist.length !== 0) {
    throw new ApiError(400, "Username not available...");
  }

  const updateUsernameQuery = "UPDATE Users SET username = ? WHERE user_id = ?";

  const [results] = await (
    await connection
  ).execute(updateUsernameQuery, [username, userID]);

  req.user.username = username;

  const payload = {
    user_id: req.user.user_id,
    username: req.user.username,
    email: req.user.email,
  };

  const newToken = generateToken(payload);
  res.cookie("token", newToken, options);
  console.log("ok2");
  res
    .status(200)
    .json(new ApiResponse(200, results, "Username Updated SuccessFully"));
});

const updateEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userID = req.user.user_id;

  console.log("ok 1 :", req.user);
  if (!email) throw new ApiError(400, "Please Provide the email");

  const checkEmailExistSQL = "SELECT * FROM Users WHERE email = ?";

  const [checkEmailExist] = await (
    await connection
  ).execute(checkEmailExistSQL, [email]);
  console.log("checkEmailExist :", checkEmailExist);
  if (checkEmailExist.length !== 0) {
    throw new ApiError(400, "Email already exists");
  }

  const UpdateEmailSQL = "UPDATE Users SET email = ? WHERE user_id = ?";

  const [results] = await (
    await connection
  ).execute(UpdateEmailSQL, [email, userID]);

  req.user.email = email;

  const payload = {
    user_id: req.user.user_id,
    username: req.user.username,
    email: req.user.email,
  };
  const newToken = generateToken(payload);
  res.cookie("token", newToken, options);

  res
    .status(200)
    .json(new ApiResponse(200, results, "Email Updated SuccessFully"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { password, oldPassword } = req.body;
  const userID = req.user.user_id;
  console.log("1 check :", userID);

  if (!(password && oldPassword)) {
    throw new ApiError(400, "Please Provide the new password and old password");
  }

  const getUserSQL = "SELECT * FROM Users WHERE user_id = ?";

  const [getUser] = await (await connection).execute(getUserSQL, [userID]);

  const user = getUser[0];

  console.log("1 uid :", user.user_id);

  const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password is Incorrect");
  }

  const hashPass = await hashPassword(password);

  const updatePasswordSQL = "UPDATE Users SET password = ? WHERE user_id = ?";

  const [results] = await (
    await connection
  ).execute(updatePasswordSQL, [hashPass, userID]);

  res
    .status(200)
    .json(new ApiResponse(200, results, "Password Changed Successfully!"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    throw new ApiError(400, "Plase Provide UserID");
  }

  const UserExistOrNot = "SELECT * FROM Users WHERE user_id = ?";
  const [userExist] = await (
    await connection
  ).execute(UserExistOrNot, [userId]);

  if (userExist.length === 0) throw new ApiError(404, "User Not Found");

  const getUserDetails = "SELECT username FROM Users WHERE user_id = ?";

  const [resluts] = await (await connection).execute(getUserDetails, [userId]);

  console.log(resluts);
  const username = resluts[0].username;
  console.log(username);
  const gettUserPostsSQL =
    "SELECT title , post_id FROM Posts WHERE user_id = ? ORDER BY DESC";

  const [getUserPosts] = await (
    await connection
  ).execute(gettUserPostsSQL, [userId]);
  console.log(getUserPosts);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { username, Posts: getUserPosts },
        "User Data Fetched SuccessFully"
      )
    );
});

const UserMain = asyncHandler(async (req, res) => {
  const username = req.user.username;
  const userId = req.user.user_id;

  const gettUserPostsSQL =
    "SELECT title , post_id FROM Posts WHERE user_id = ? ORDER BY created_at  DESC";

  const [getUserPosts] = await (
    await connection
  ).execute(gettUserPostsSQL, [userId]);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { username, posts: getUserPosts },
        "User Fetch succesfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  verifyToken,
  connection,
  updateEmail,
  updateUsername,
  updatePassword,
  logoutUser,
  getUserProfile,
  UserMain,
};
