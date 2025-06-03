import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Domain } from "domain";
import { Video } from "../models/video.models.js";
import fs from "fs"
import { extractPublicId } from 'cloudinary-build-url'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { env } from "process";
import { generateMailToken ,mailConfig} from "../utils/mail.js";
// ✅ REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    // ✅ Cleaner validation
    if ([fullName, username, email, password].some(field => field?.trim() === "")) {
        return res.status(400).json(new ApiResponse(400,"fields are required", "All fields are required"));
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        return res.status(409).json(new ApiResponse(409,"exist","User already exists"));
    }

    // ✅ Fixed: check avatar existence properly and error out if missing
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }



    // ✅ Structured user creation with safe defaults
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        // coverImage :"",
        // avatar:"",
        isLogined: false
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    let avatar, coverImage;
    try {
        // ✅ Cleaned Cloudinary upload logic
        avatar = await uploadOnCloudinary(avatarLocalPath, user._id);
        if (req.files.coverImage?.[0]?.path) {
            const coverLocalPath = req.files.coverImage[0].path;
            coverImage = await uploadOnCloudinary(coverLocalPath, user._id);
        }
    } catch (error) {
        throw new ApiError(500, "Error uploading images");
    }

    user.coverImage = coverImage.url
    user.avatar = avatar.url
    user.save({ validateBeforeSave: false })

    return res.status(201).json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

// ✅ NEW: FIXED TOKEN GENERATOR UTILITY FUNCTION
const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    // ✅ Removed broken res.status usage inside utility
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // ✅ Fixed: store refresh token in the *user document*, not the model
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

// ✅ LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password, isLogined } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "Email or Username is required");
    }

    const user = await User.findOne({ $and: [{ email }, { username }] });
    if (!user || !(await user.isPasswordCorrect(password))) {
        // console.log("reached")
        // throw new ApiError(401, "Invalid credentials");
        return res.status(401).json(new ApiResponse(401, "success", "Invalid credentials"))
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    // const t_user = User.findById(user._id)
    // t_user.isLogined=true

    loggedInUser.isLogined = true
    loggedInUser.accessToken = accessToken
    await loggedInUser.save({ validateBeforeSave: false })
    const options = {
        httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true in prod (HTTPS only)
  sameSite: "none",   // must be 'none' for cross-site cookies
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
    };
    //  document.cookie= accessToken
    //  document.cookie=refreshToken
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User Logged In Successfully"));
});


// ✅ FIXED: REFRESH TOKEN ROUTE
const refreshAccessToken = asyncHandler(async (req, res) => {
    // ✅ Fixed: this block was OUTSIDE the function in original code
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded?._id);

        // ✅ Fixed: proper token check + fallback error message
        if (!user || incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(403, "Invalid or expired refresh token");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { user, accessToken, refreshToken: newRefreshToken }, "Token refreshed successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing token");
    }
});

// ✅ FIXED: LOGOUT FUNCTION (previously just placeholder)
const logoutUser = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    console.log("Received logout request");

    // Log incoming cookies and headers
    console.log("Request Cookies: ", req.cookies);
    console.log("Request Headers: ", req.headers);
    console.log("User from JWT: ", req.user);

    // Check if the user is authenticated
    if (!req.user || !req.user._id) {
        console.log("User info missing, cannot logout");
        return res.status(401).json({ message: "Unauthorized user, cannot logout" });
    }

    // Log out the user from the database
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "null",
                isLogined: false,
                accessToken: "null"
            }
        },
        { new: true }
    );
    // await User.save({ validateBeforeSave: false })
    console.log(req.user.refreshToken)
    console.log("User successfully logged out from database");

    // Send a successful response and clear cookies
    return res
        .status(200)
        .clearCookie("accessToken", {
                   httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true in prod (HTTPS only)
  sameSite: "none",   // must be 'none' for cross-site cookies
  path: "/",

     
        })
        .clearCookie("refreshToken", {
         httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true in prod (HTTPS only)
  sameSite: "none",   // must be 'none' for cross-site cookies
  path: "/",

      
        })
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const token = req.cookies.accessToken
    console.log("change pw")
    const user = await User.findOne({accessToken:token})

    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordValid) return res.status(400).json(new ApiResponse(400,"Old Password is Incorrect"))

    user.password = newPassword
    await user.save({ validateBeforeSave: false }) 

    return res.status(200).json(new ApiResponse(200, "Password changed successfully "))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Current user details "))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname } = req.body

    if (!fullname) {
        throw new ApiError(400, "Full Name is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,

            }
        },
        { new: true }
    ).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.files?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "File is Required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(500, "something went wrong while uploading avatar")
    }

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        }, {
        new: true
    }
    ).select("-password -refreshToken")

    res.status(200).json(ApiResponse(200, user, "Avatar successfully changed"))
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.files?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "File is Required")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(500, "something went wrong while uploading coverImage")
    }

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        }, {
        new: true
    }
    ).select("-password -refreshToken")

    res.status(200).json(ApiResponse(200, user, "coverImage successfully changed"))


})

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params

    if (!username?.trinm()) {
        throw new ApiError(400, "Username is required")
    }

    const channel = await User.aggregate(
        [
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "subscription",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"

                }
            },
            {
                $addFields: {
                    subscribersCount: {
                        $size: "subscribers"
                    },
                    channelSubscribedToCount: {
                        $size: "$subscribredTo"
                    },
                    isSubscribed: {
                        $cond: {
                            if: {
                                $in: [req.user?._id, "$subscribers.subscriber"]
                            },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                //project only neccessary Data
                $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1,
                    subscribersCount: 1,
                    channelSubscribedToCount: 1,
                    isSubscribed: 1,
                    coverImage: 1,
                    email: 1

                }
            }

        ]
    )

    if (!channel?.length) {
        throw new ApiError(404, "Channel not Found ")
    }

    return res.status(200).json(new ApiResponse(200, channel[0], "channel profile fetchd successfully"))
})

const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await user.aggregate([
        {
            $match: {
                id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner",
                        pipeline: {
                            $project: {
                                fullName: 1,
                                username: 1,
                                avatar: 1
                            }
                        }
                    }
                }
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        }

    ])
    return res.status(200).json(new ApiResponse(200, user[0], "Watch History fetched Successfully"))
})

const dashboard = asyncHandler(async (req, res) => {
    const token = req.cookies.accessToken
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    console.log(user)
    console.log(`token recieved ${token}`)
    return res.status(200).json(new ApiResponse(200, user, "token recieved ${token}"))
})


const uploadVideo = asyncHandler(async (req, res) => {
    console.log("upload backend code reached")
    const token = req.cookies.accessToken
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    const { videoTitle, description } = req.body
    //  console.log()
    //  const user = User.findById(user._id)
    //  console.log(`videoTitle : ${videoTitle} , description : ${description}`)

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    console.log(videoLocalPath, " ", thumbnailLocalPath)
    if (!videoLocalPath) {
        throw new ApiError(400, "Video is required");
    } else if (!thumbnailLocalPath) {
        throw new ApiError(400, "thumbnail is required");
    }

    let videoFileURL, thumbnailURL;
    let videoPublicId, thumbnailPublicId;
    try {
        videoFileURL = await uploadOnCloudinary(videoLocalPath, user._id)
        thumbnailURL = await uploadOnCloudinary(thumbnailLocalPath, user._id)
        videoPublicId = extractPublicId(videoFileURL.url)
        thumbnailPublicId = extractPublicId(thumbnailURL.url)
    } catch (error) {
        console.log(error)
        return res.status(400).json(new ApiResponse(400, "Video Upload failed"))
    }

    try {
        const video = await Video.create({
            videoPublicId,
            thumbnailPublicId,
            videoTitle,
            description,
            videoFile: videoFileURL.url,
            thumbnail: thumbnailURL.url,
            owner: user
        })

        await User.findByIdAndUpdate(
            user._id, // just pass the ID directly
            { $push: { myVideos:{ videoId:video._id} } },
            { new: true } // optional: return the updated document
        );
        return res.status(201).json(new ApiResponse(201, video, "video Uploaded Successfully"));

    } catch (error) {
        console.log("db array error")
        console.log(error)
    }

    // try{
    //     fs.unlink(videoLocalPath, (err) => {
    //         if (err) console.error("Error deleting video file:", err);
    //       });

    //       fs.unlink(thumbnailLocalPath, (err) => {
    //         if (err) console.error("Error deleting thumbnail:", err);
    //       });

    //       return res.status(201).json(new ApiResponse(201, video, "video Uploaded Successfully"));
    // }catch(error){
    //     console.log(error)
    // }
})

const fetchContent = asyncHandler(async (req, res) => {
    const contentList = await Video.find({}, {
        videoTitle: 1,
        description: 1,
        videoFile: 1,
        thumbnail: 1,
        videoPublicId: 1,
        thumbnailPublicId: 1,
        views:1
    })
    console.log(contentList)
    res.status(200).json(new ApiResponse(200, contentList, "fetched data successfully"))
})

// const commentOnVideo = asyncHandler(async (req, res) => {
//     const { id, comment } = req.body;

//     if (!id || !comment) {
//       return res.status(400).json({ error: "id and comment are required" });
//     }

//     const token = req.cookies.accessToken;
//     if (!token) {
//       return res.status(401).json({ error: "No access token provided" });
//     }

//     const user = await User.findOne({ accessToken: token });
//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     const video = await Video.findById(id);
//     if (!video) {
//       return res.status(404).json({ error: "Video not found" });
//     }

//     try {
//       const updatedVideo = await Video.findByIdAndUpdate(
//         video._id,
//         {
//           $push: {
//             comments: {
//               user: user._id,
//               text: comment
//             }
//           }
//         },
//         { new: true }
//       );

//       return res.status(200).json(updatedVideo);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Server error" });
//     }
//   });

const commentOnVideo = asyncHandler(async (req, res) => {
    console.log("Raw body:", req.body); // Example: { id: '123', comment: 'hello' }

    const { videoId, comment } = req.body;

    // Ensure both id and comment are provided
    if (!videoId || !comment) {
        return res.status(400).json({ message: "Missing id or comment" });
    }

    // Find the video by ID (make sure to await it)
    const video = await Video.findById(videoId);

    if (!video) {
        return res.status(404).json({ message: "Video not found" });
    }

    console.log("Video found, proceeding to add comment");

    // OPTIONAL: If you want to add user info, get user from token
    const token = req.cookies.accessToken;
    const user = await User.findOne({ accessToken: token });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Example comment push without user:
    video.comments.push({
        text: comment,
        userid: user._id  // Uncomment if you're tracking who commented
    });

    await video.save(); // Save the updated video with the new comment

    return res.status(200).json({ message: "Comment added successfully", video });
});



const likesOnVideo = asyncHandler(async (req, res) => {

    const Id = req.body.id
    const video = await Video.findById(Id)
    const videoLikedUserdData = video.populate('likes.userId')
    const token = req.cookies.accessToken
    // const user = await User.findOne({accessToken : token})
    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ accessToken: token });
    // console.log(videoLikedUserdData)

    let userExist="";
    video.likes.forEach(like => {
        // console.log(`db id: ${like.userId._id.toString()} comparing with:  ${ user._id.toString()}`)
        if (like.userId._id.toString() == user._id.toString()) {
             userExist=1
            return res.status(201).json(new ApiResponse(201,"user liked already"))
 
        }
        // console.log(like._id.toString())
    });
    // console.log(user._id.toString())
    //    console.log(typeof(user))
    //    console.log(Id)
    //    console.log(user)

    //    console.log(video.videoTitle)


    //    if(hasLiked)
    //    {
    //     return res.status(200).json(new ApiResponse(200,"user already liked the video"))
    //    }
   if(userExist!=1){ video.likes.push({ userId: user._id });
    video.likesCount = video.likes.length
    //   video.likesCount += 1;
    await video.save();
    //    video.likes.user=user._id

     return res.status(200).json(new ApiResponse(200, video, "working"))}

})

 const videoData = asyncHandler(async (req,res) => {
    const video = await Video.findById(req.body.videoId).populate('owner','username subscriberCount avatar').populate('comments.userid', 'username avatar');
    // console.log(req.body.videoId)
    // console.log(`watch video id : ${video}`)
    return res.status(200).json(new ApiResponse(200,video))
 })


const userInfo = asyncHandler(async (req,res)=>{
    const token = await req.cookies.accessToken
    const user = await User.findOne({accessToken : token}).select('username avatar -_id')
    return res.status(200).json(new ApiResponse(200,user))
    console.log(user)
})

// const newComment = asyncHandler(async (req,res) => {
// //   console.log("newComment")
//   console.log(req.body.comment)
//    const {videoId , comment} = req.body
//    const token = await req.cookies.accesstoken
//    const video = await Video.findById(videoId)
//    const user = await User.findOne({accessToken: token})
//    video.comm
//       console.log(user)
//       console.log(video)
//       console.log(comment)
// })

const likeDbCheckAndUpdate = asyncHandler(async(req,res) =>{
    const videoId = req.body.videoId
    const token = req.cookies.accessToken
    const user = await User.findOne({accessToken :token})
    const video = await Video.findById(videoId)
  
if (!video) {
  return res.status(404).json({ message: "Video not found" });
}
      console.log(videoId)
    try{
        const hasLiked =  video.likes.some(like => like.userId.toString() === user._id.toString());
        const hasDisLiked =  video.dislikes.some(dislike => dislike.userId.toString() === user._id.toString());
         console.log(hasLiked)
        if(hasLiked == true && hasDisLiked == false){
            video.likes = video.likes.filter(like => like.userId.toString() !== user._id.toString());
            video.likesCount--;
            console.log("like removed")
            await video.save()
            return res.status(200).json(new ApiResponse(200,video),"unlike")
        }else if(hasLiked == false ){
            if(hasDisLiked)
            {
                video.dislikes = video.dislikes.filter(dislike => dislike.userId.toString() !== user._id.toString());
                video.dislikesCount--;
                await video.save()
                
            }
                video.likes.push({
                    userId: user._id,
                  })
                  video.likesCount++;
                  console.log("like added")
                  await video.save()
                  return res.status(200).json(new ApiResponse(200,video,"like"))
          
        }
        await video.save()
    }catch(error){
        console.log(error)
    }
    
})

const dislikeDbCheckAndUpdate = asyncHandler(async(req,res) =>{
    const videoId = req.body.videoId
    const token = req.cookies.accessToken
    const user = await User.findOne({accessToken :token})
    const video = await Video.findById(videoId)

    try{
        const hasLiked =  video.likes.some(like => like.userId.toString() === user._id.toString());
        const hasDisLiked =  video.dislikes.some(dislike => dislike.userId.toString() === user._id.toString());

        if(hasLiked == false && hasDisLiked == true){
            video.dislikes = video.dislikes.filter(dislike => dislike.userId.toString() !== user._id.toString());
            video.dislikesCount--;
            await video.save()
            console.log("dislike removed")
            return res.status(200).json(new ApiResponse(200,video,"undislike"))
            
        }else if(hasDisLiked == false){
            if(hasLiked)
            {
                video.likes = video.likes.filter(like => like.userId.toString() !== user._id.toString());
                video.likesCount--;
            }
                video.dislikes.push({
                    userId: user._id,
                  })
                  video.dislikesCount++;
                  console.log("dislike added")
                  await video.save()
                  return res.status(200).json(new ApiResponse(200,video,"dislike"))
        }
       await video.save()
    }catch(error){
        console.log(error)
    }
    
})


const subscribe = asyncHandler(async(req,res) => {
   try{
     const token = req.cookies.accessToken
     const subscribedToId = await req.body.subscribedTo
     console.log(subscribedToId)
     const owner = await User.findById(subscribedToId)
     console.log(owner)
    const user  = await User.findOne({accessToken :token})
    const hasSubscribed = owner.subscriberDetail.some(subscriber => subscriber.userid?.toString() === user._id.toString())
    console.log(hasSubscribed)
       if(!hasSubscribed){
    owner.subscriberDetail.push({
        userid: user._id
    })
    owner.subscriberCount++
    await owner.save()
    return res.status(200).json(new ApiResponse(200,owner,"subscribed"))
}else{
    owner.subscriberDetail = user.subscriberDetail.filter(subscriber => subscriber.userid?.toString() !== user._id.toString())
    owner.subscriberCount--;
        await owner.save()
        return res.status(200).json(new ApiResponse(200,owner,"subscribe"))
}
   }catch(error){
    console.log(error)
   }
})

const myVideos = asyncHandler(async(req,res) => {
    const token = req.cookies.accessToken
    const user = await User.findOne({accessToken : token}).select("myVideos").populate("myVideos.videoId")
    console.log(user)
     return res.status(200).json(new ApiResponse(200,user,"success"))
})

const editVideo = asyncHandler(async (req,res) => {
    const {videoId,title,description} = req.body
    console.log(videoId)
    const video = await Video.findById(videoId)
   console.log(video)
    
        video.videoTitle = title
        video.description = description
    
    await video.save()
    return res.status(200).json(new ApiResponse(200,video,"updated Successfully"))
})

const deleteVideo = asyncHandler(async (req,res) => {
    console.log("reached delete0")
    try{
    const {videopublicId,thumbnailpublicId} = req.body
    console.log(videopublicId,thumbnailpublicId)

    const token = await req.cookies.accessToken
    console.log(token)
    const user = await User.findOne({accessToken : token})
    const videoLibData = await Video.findOne({videoPublicId:videopublicId})
    console.log(videoLibData)
//  let videoprocess,thumbnailprocess;'
  let videoprocess = await deleteFromCloudinary(videopublicId,"video")
    let thumbnailprocess= await deleteFromCloudinary(thumbnailpublicId,"image")
 user.myVideos = await user.myVideos.filter(
  (entry) => entry.videoId.toString() !== videoLibData._id.toString()
);
await user.save();
console.log(`video id : ${videoLibData._id}`)
await Video.deleteOne({ _id: videoLibData._id });
// await videoLibData.save()
 
 
   return res.status(200).json(new ApiResponse(200,"video removed"))
    }catch(error){
        console.log(error)
    }
})

const myPage = asyncHandler(async(req,res)=> {
 const channelId = req.body.channelId
 console.log(channelId)
 const user = await User.findById(channelId).select("username subscriber avatar coverImage subscriberCount myVideos fullName _id").populate("myVideos.videoId")
 return res.status(200).json(new ApiResponse(200,user,"success"))
})

const allData = asyncHandler(async (req,res) => {
    const token = req.cookies.accessToken
    const user = await User.findOne({accessToken : token})
    return res.status(200).json(new ApiResponse(200,user,"successfully fetched"))
})

const postAboutMe= asyncHandler(async (req,res) => {
    const token = req.cookies.accessToken
    const user = await User.findOne({accessToken : token})
    const aboutMe =  req.body.aboutMe
//    console.log(aboutMe)
  

    user.aboutMe = aboutMe;
   await user.save();
   console.log(`new about me ${user.aboutMe}`)
    return res.status(200).json(new ApiResponse(200,user))
})

const Mail = asyncHandler(async (req,res) => {
    console.log("reachedm mail")
    const recieverMailAddress =  req.body.mailId
    console.log(recieverMailAddress)
    const token = req.cookies.accessToken
    const  user = await User.findOne({accessToken:token})

    const getMailToken = await generateMailToken(user._id)
    user.verificationtoken = getMailToken
    await user.save()
    await mailConfig(recieverMailAddress,getMailToken) 
 
    
})

const verifyToken = asyncHandler(async(req,res) => {
    const tokenRecieved = req.query.token
    const user = User.findOne({verificationtoken : tokenRecieved})

    if(user){
        const url = `http://localhost:3004/newPassword.html?u=${tokenRecieved}`
        console.log("User token is verified")
        //  res.status(200).json(new ApiResponse(200,"Verified"))
       return  res.redirect(url);
    }
    else{
        console.log("user Token is not verified")
         return res.status(400).json(new ApiResponse(400,"Not Verified"))
    }

})

const newPw = asyncHandler(async(req,res) => {
    console.log("reached newPw")
    // console.log(await(req.body.token))
    const token =await  req.body.token
    console.log(`token ${token}`)
    const user = await User.findOne({verificationtoken:token})
    const password = req.body.newPassword
    console.log(`new pw :- ${password}`)
   console.log(`token recieved : ${token} new password :${password}`)
    user.password=password
    await user.save()
    return res.status(200).json(new ApiResponse(200,"password Updated Successfully"))
} )


const views = asyncHandler(async(req,res)=>{
    const token = req.cookies.accessToken
    const user = await User.findOne({accessToken : token})
    const videoId = req.body.videoId
    const creatorsId = req.body.viewsTo
    // const creatorData = Video.findById(creatorsId)
    const videoData = await Video.findById(videoId)

    console.log(`video Id : ${videoId}`)
    console.log(`Creators data : ${videoData}`)
    console.log(`user data : ${user}`)
    videoData.views++;
    await videoData.save()
    
    user.watchHistory.push({
      videoId:videoData._id
    })
    await user.save()
    console.log(`watch history : ${user.watchHistory}`)
})


const onlyId = asyncHandler(async (req,res) => {
    const token = req.cookies.accessToken
    const user =  await User.findOne({accessToken : token})
    return res.status(200).json(new ApiResponse(200,user))
})


const subscribeCheck = asyncHandler(async (req, res) => {
  const channelId = req.body.channelId;

  const channelData = await User.findById(channelId);
     console.log(`channel id :- ${channelId}`)
  if (!channelData) {
    return res.status(404).json(new ApiResponse(404, "Channel not found"));
  }
   
  const token = req.cookies.accessToken;
  const user = await User.findOne({ accessToken: token });
  if (!user) {
    return res.status(401).json(new ApiResponse(401, "Unauthorized"));
  }

const subscriberCheck = channelData.subscriberDetail.some(subscriber => subscriber.userid?.toString() === user._id.toString())
  console.log(`subscribe check : ${subscriberCheck}`);

  if (subscriberCheck) {
    return res.status(200).json(new ApiResponse(200, "subscribed"));
  } else {
    return res.status(200).json(new ApiResponse(200, "not subscribed"));
  }
});

const Authorization = asyncHandler(async(req,res) => {
    const accessToken = req.cookies.accessToken
    const user = User.findOne({accessToken:accessToken})

    if(user){
        return res.status(200).json(new ApiResponse(200,"authorized","success"))

    }
    else{
        return res.status(400).json(new ApiResponse(400,"not authorized","failed"))
    }
})

const saveVideo = asyncHandler(async(req,res) => {
    const token =  req.cookies.accessToken
    const user =  await User.findOne({accessToken: token})
    const videoId = req.body.videoId 
   const idCheck = user.saved.some(save => save.videoId?.toString() === videoId)

     if(idCheck == true){

        user.saved = user.saved.filter(save => save.videoId?.toString() !== videoId.toString())
        await user.save()
        console.log("save removed")
        return res.status(200).json(new ApiResponse(200,"","Saved removed Successfully!"))
     }   else{
        user.saved.push({
        videoId:videoId
    })
    await user.save();
    return res.status(200).json(new ApiResponse(200,"","Saved Successfully!"))
     }

   
})

const history =asyncHandler(async(req,res) => {
    // console.log("history")
    // return res.status(200).json(new ApiResponse(200,"history reached"))
    const token = await req.cookies.accessToken
    // const user = await User.findOne({accessToken : token})
    const user =  await User.findOne({accessToken: token})
    res.status(200).json(new ApiResponse(200,user.select(`watchHistory`).populate(`watchHistory.videoId`)))
    // return res.status(200).json(new ApiResponse(200,user))
})

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser, // ✅ added to export
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
    getCurrentUser,
    uploadVideo,
    dashboard,
    fetchContent,
    commentOnVideo,
    likesOnVideo,
    videoData,
    userInfo,
    likeDbCheckAndUpdate,
    dislikeDbCheckAndUpdate,
    subscribe,
    myVideos,
    editVideo,
    deleteVideo,
    myPage,
    allData,
    postAboutMe,
    Mail,
    verifyToken,
    newPw,
    views,
    onlyId,
    subscribeCheck,
    Authorization,
    saveVideo,
    history
    
    // newComment

};
