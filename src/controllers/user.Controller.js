import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import createConnection from "../db/connectionDB.js";
import { hashPassword, isPasswordCorrect } from "../utils/hashPassword.js";

const connection = createConnection();
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

    res.status(201).json(insertResult);
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
});

//login User
const loginUser = asyncHandler(async (req, res) => {});

export { registerUser };
