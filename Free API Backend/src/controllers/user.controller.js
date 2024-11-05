import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(email);
    const user = await User.create({
        username,
        email,
        password 
    });
    console.log(user);
    if (!user) {
        throw new ApiError("User not created", 400);
    }
    
    return res.status(201).json(
        new ApiResponse(201, "User created", user)
    );    
})

export { registerUser };