import express from "express";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

dotenv.config({
  path: "./config.env",
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});
