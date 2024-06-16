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
import { verifyToken } from "./controllers/user.Controller.js";
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
app.get("/posts", (req, res) => {
  res.sendFile("/html/index.html", { root: "public" });
});

app.get("/getusername", verifyToken, (req, res) => {
  res.status(200).json({ username: req.user.username });
});

app.use(errorHandler);
export { app };
