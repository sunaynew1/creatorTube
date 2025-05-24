import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async (req,res,next) => {
            console.log(`access token :${req.cookies.accessToken}`)
    const token = req.cookies.accessToken || req.header("Authorisation")?.replace("Bearer ", "")
    console.log("JWT check")
    if(!token) res.status(401).json(401,"token empty","failed token")
        
        try{
            const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
         req.user=user
         console.log("JWT verified")
         next()
         
        }catch(error){
            console.log("ERROR JWT AUTH :AUTH MIDDLEWARE", error.message);
            throw new ApiError(401, "Unauthorized - Invalid or expired token");
        }

      
})
        
// export default verifyJWT;
 