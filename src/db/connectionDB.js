import "dotenv/config";
import mysql from "mysql2/promise";
import { ApiError } from "../utils/ApiError.js";

const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("DB connected successfully...");
    return connection;
  } catch (error) {
    throw new ApiError(500, "Error while connecting to DB");
  }
};

export default createConnection;
