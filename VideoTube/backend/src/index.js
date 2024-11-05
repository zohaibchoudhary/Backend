import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`⚙️  Server is running on port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB Connection Failed !!!", error);
})














// import express from "express";

// const app = express();

// ;(async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("Error", (error) => {
//             console.log(error);
//             throw error;

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);

//         })    
//         })        
//     } catch (error) {
//         console.error("Error", error);
//         throw error;
//     }
// })()