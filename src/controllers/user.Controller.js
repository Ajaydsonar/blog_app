import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import createConnection from "../db/connectionDB.js";
import { hashPassword } from "../utils/hashPassword.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.status(200).send({ auth: true, token });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
});

//verify token
const verifyToken = asyncHandler((req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) throw new ApiError(409, "No Token Provided");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) throw new ApiError(500, "Failed To Authenticate");
    req.userId = decoded.id;
    next();
  });
});

export { registerUser, loginUser, verifyToken, connection };
