import "dotenv/config";
import connection from "./db/connectionDB.js";
import { app } from "./app.js";

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to DB", err);
  } else {
    console.log("Connected to MySql DB");
    app.listen(process.env.port, () => {
      console.log(`Server is running on port ${process.env.port}`);
    });
  }
});
