import "dotenv/config";
import createConnection from "./db/connectionDB.js";
import { app } from "./app.js";

app.listen(process.env.port, () => {
  console.log(`Server is on Port : ${process.env.port}`);
});
