import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
   videoPublicId: {
      type: String
   },
   thumbnailPublicId: {
      type: String
   },
   videoTitle: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   videoFile: {
      type: String, //cloudinary URL
      required: true
   },
   thumbnail: {
      type: String,
      required: true
   },
   duration :{
      type:String,
      default:"0"
   },

   views: {
      type: Number,
      required: true,
      default: 0
   },
   likes: [
      {
        userId: {type: mongoose.Schema.Types.ObjectId ,ref: 'User',required: true},
        likedAt: { type: Date, default: Date.now }
      }
    ],
    likesCount: {
      type: Number,
      default: 0
    },
    dislikes: [
      {
        userId: {type: mongoose.Schema.Types.ObjectId ,ref: 'User',required: true},
        dislikedAt: { type: Date, default: Date.now }
      }
    ],
    dislikesCount: {
      type: Number,
      default: 0
    },
   comments: [
      {
         userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
         text: { type: String, required: true },
         createdAt: { type: Date, default: Date.now }
      }
   ]
   ,
   isPublished: {
      type: Boolean,
      default: true
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
   }
},
   { timestamps: true }
)

export const Video = mongoose.model("Video", videoSchema)