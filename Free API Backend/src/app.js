import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    }
));


app.use("/api/v1/users", userRouter)

export { app }