import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

// dotenv insert😎
dotenv.config({ path: "./config/config.env" });

// connect the backend to  frontend ⭐
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// you already know about that....
app.use(cookieParser());
app.use(express.json());

// string ko json mai  converting......
app.use(express.urlencoded({ extended: true }));

// cloudniary
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

// db connection

dbConnection();

// dhyan se last mai hona chaiye error wala....

app.use(errorMiddleware);

export default app;
