import dotenv from "dotenv";
import {connectDB} from "./db/index.js"
import { app } from "./app.js";

dotenv.config({
    path: './env'
});

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})