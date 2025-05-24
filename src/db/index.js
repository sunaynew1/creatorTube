import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try{
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)  //URI – Uniform Resource Identifier
      console.log(`\n MongoDB Connectd DB host ${connectionInstance.connection.host}`)
    }catch (error){
    console.log("MongoDB Connection ERROR " ,error)
    process.exit(1)
    }
}

export default connectDB