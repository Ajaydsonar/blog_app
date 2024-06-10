import "dotenv/config";
import express from "express";
import cors from "cors";
import connection from "./db/connectionDB.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({ origin: "*" }));

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to DB", err);
  } else {
    console.log("Connected to DB");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
