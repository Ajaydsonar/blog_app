import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({ origin: "*" }));

//routes declaration
import router from "./routes/user.Route.js";

app.use("/api/v1/user", router);

// app.use((err, req, res, next) => {
//   res.status(err.statusCode).json({
//     message: "Internal Server Error",
//     err: err.message,
//   });
// });

export { app };
