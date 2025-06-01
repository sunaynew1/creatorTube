// id string pk
// username string
// email string
// full Name string
// avatar string
// cover-Image string
// watchHistory Objectld[] videos
// password string
// refreshToken string
// createdAt Date
// updatedAt Date 

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName:
    {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    avatar: {
        type: String, //cloudinary URL

    },
    aboutMe: {
        type: String,
        default: "Welcome to my channel"
       
    },
    coverImage: {
        type: String,  //cloudinary URL
    },
    subscriberCount: {
        type: Number, 
        default: 0
    },
    subscriberDetail: [{
        userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        subscribedAt: { type: Date, default: Date.now }

    }],
    watchHistory: [{
        videoId:{
        type: Schema.Types.ObjectId,
        ref: "video",
    }
    }],
    saved: [{
        videoId:{
        type: Schema.Types.ObjectId,
        ref: "video",
    }
    }],
    myVideos: [{
        videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }
    }],
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    refreshToken: {
        type: String
    },
    accessToken: {
        type: String
    },
    verificationtoken :{
        type :String 
    },

    isLogined: {
        type: Boolean
    }


},
    { timestamps: true }

)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    console.log("password: " + this.password)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    //short lived access token 
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.generateRefreshToken = function () {
    //short lived access token 
    return jwt.sign({
        _id: this._id,

    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}
export const User = mongoose.model("User", userSchema)