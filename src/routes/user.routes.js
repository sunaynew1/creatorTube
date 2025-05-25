import {Router} from "express"
import { logoutUser,
     registerUser ,
     loginUser,
      refreshAccessToken,
      changeCurrentPassword,
      getCurrentUser,
      getUserChannelProfile,
      updateAccountDetails,
      updateUserAvatar,
      getWatchHistory,
      updateUserCoverImage,
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
      Authorization

    } from "../controllers/user.controller.js"
// import multer from "multer";
import  upload  from "../middlewares/multer.middlewares.js"
import { healthcheck } from "../controllers/healthcheck.controllers.js"
// const upload = multer({ dest: "uploads/" });
import { verifyJWT } from "../middlewares/auth.middleware.js"

import jwt from "jsonwebtoken"



const router = Router()


// router.route("/").get(healthcheck)
 router.route("/test").get(healthcheck)

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount: 1
        },{
            name:"coverImage",
            maxCount:1
        }
    ])
    ,registerUser)
 
    router.route("/login").post(loginUser)
    router.route("/refresh-token").post(refreshAccessToken)
    router.route("/upload-video").post(verifyJWT,
        upload.fields([
            {
                name : "videoFile",
                maxCount:1
            },
            {
                name : "thumbnail",
                maxCount:1
            }
        ])
        ,uploadVideo)

        router.route("/content").get(fetchContent)
        router.route("/videoData").post(videoData)
          router.route("/Authorization").post(Authorization)
    //     router.route("/watch").get(watchVideo)
    // //Secured routes
    // router.route("/newComment").post(verifyJWT,newComment)
     
    router.route("/subscribeCheck").post(verifyJWT,subscribeCheck)
      router.route("/views").post(verifyJWT,views)
      router.route("/onlyId").post(verifyJWT,onlyId)
    router.route("/Mail").post(verifyJWT,Mail)
     router.route("/newPw").post(verifyJWT,newPw)
    router.route("/verifyToken").get(verifyJWT,verifyToken)
    router.route("/deleteVideo").post(verifyJWT,deleteVideo)
     router.route("/postAboutMe").post(verifyJWT,postAboutMe)
    router.route("/allData").post(verifyJWT,allData)
    router.route("/myPage").post(verifyJWT,myPage)
    router.route("/editVideo").post(verifyJWT,editVideo)
     router.route("/myVideos").post(verifyJWT,myVideos)
    router.route("/subscribe").post(verifyJWT,subscribe)
    router.route("/like").post(verifyJWT,likeDbCheckAndUpdate)
    router.route("/dislike").post(verifyJWT,dislikeDbCheckAndUpdate)
    router.route("/userInfo").post(verifyJWT,userInfo)
     router.route("/likeCount").post(verifyJWT,likesOnVideo)
    router.route("/comment").post(commentOnVideo)
    router.route("/logout").post(verifyJWT,logoutUser)
    router.route("/dashboard").post(verifyJWT,dashboard)
    router.route("/change-password").post(verifyJWT,changeCurrentPassword)
    router.route("/current-user").get(getCurrentUser)
    router.route("/username").get(verifyJWT,getUserChannelProfile)
    router.route("/update-account").patch(verifyJWT,updateAccountDetails)
    router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
    router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
    router.route("/history").get(verifyJWT,getWatchHistory)

export default router