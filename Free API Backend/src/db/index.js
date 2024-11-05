import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Mongo db connected");
    } catch (error) {
        console.log("Mongo db connection error:", error);
    }
}

export {connectDB}