import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

//routes declaration
import router from "./routes/user.Route.js";

app.use("/api/v1/user", router);

//post router
import postRouter from "./routes/post.Route.js";
app.use("/api/v1/post", postRouter);

// app.use((err, req, res, next) => {
//   res.status(err.statusCode).json({
//     message: "Internal Server Error",
//     err: err.message,
//   });
// });

export { app };
