import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import connection from "../db/connectionDB.js";
import { hashPassword, isPasswordCorrect } from "../utils/hashPassword.js";

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

  const userAlreadyExistQuery =
    "SELECT * FROM Users WHERE username = ? OR email = ?";
  connection.query(userAlreadyExistQuery, [username, email], (err, result) => {
    if (err)
      throw new ApiError(500, "Internal server error" + `${err.message}`);

    if (result.length > 0) {
      throw new ApiError(409, "User already exists");
    }
  });

  const hashPass = await hashPassword(password);

  const userInsertQuery =
    "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";

  connection.query(
    userInsertQuery,
    [username, email, hashPass],
    (err, result) => {
      if (err) throw new ApiError(500, "Internal server error");

      res
        .status(201)
        .json(new ApiResponse(201, "User created successfully", result));
    }
  );
});

export { registerUser };
