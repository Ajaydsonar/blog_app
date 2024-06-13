import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

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

// register
app.get("/register", (req, res) => {
  res.sendFile("/html/register.html", { root: "public" });
});

// login
app.get("/login", (req, res) => {
  res.sendFile("/html/login.html", { root: "public" });
});

// posts
app.get("/post", (req, res) => {
  res.sendFile("/html/index.html", { root: "public" });
});

// app.use((err, req, res, next) => {
//   res.status(err.statusCode).json({
//     message: "Internal Server Error",
//     err: err.message,
//   });
// });

app.use(errorHandler);
export { app };
