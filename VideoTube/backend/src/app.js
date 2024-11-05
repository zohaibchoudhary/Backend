import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// use || for configration && middlewares
app.use(express.json({limit: '16kb'}))
// extended || when give obj in obj
app.use(express.urlencoded({limit: '16kb', extended: true}))
// static || store public files like img, pdfs in our folder
app.use(express.static("public"))
// to perform CRUD operation on user cookies
app.use(cookieParser())

// Routes import

import userRouter from "./routes/user.routes.js"

// routes declaration

app.use("/api/v1/users", userRouter)
// http://localhost:3000/api/v1/users/register



export { app }