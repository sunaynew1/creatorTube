import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema({

    //either of 'Video ,'comment' or 'tweet' will be assigned others are null 

    video :{
        type: Schema.Types.ObjectId,
        ref:"Video"
    },
    comment:{
        type: Schema.Types.ObjectId,
        ref:"Comment"   
    },
    tweet:{
        type: Schema.Types.ObjectId,
        ref:"Tweet"   
    },
    LikedBy:{
        type: Schema.Types.ObjectId,
        ref:"user"   
    },
  },
   {timestamps:true}
)

export const Like = mongoose.model("Like", likeSchema)