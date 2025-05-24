import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"


dotenv.config()
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEYS, 
        api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    
    
   const uploadOnCloudinary = async (localFilepath,id) =>{
    try{
        if(!localFilepath){
           return null 
        }

       const response = await cloudinary.uploader.upload(
            localFilepath, {
                folder: `users/${id}`,
                upload_preset : "ml_default",
                resource_type :"auto"
            }
        )

     
        console.log("FIle is uploaded on Cloudinary. File src:" , response.url)
        //once the file is uploaded we would like to delete it from our server 
        fs.unlinkSync(localFilepath)
        return response;

    }catch(error){
        console.log("Cloudinary Upload failed error : " , error )
        return null
    }
   }

   const deleteFromCloudinary = async (publicId,type) => {
    try{
        if(!publicId){
            return null
        }

        const response = await cloudinary.uploader.destroy(publicId,{resource_type: type})
       if (response.result === 'ok') {
      console.log(`✅ File deleted from Cloudinary: ${publicId}`);
    } else {
      console.warn(`⚠️ Cloudinary deletion not confirmed for: ${publicId}`, response);
    }
    }catch(error){
      console.log(error)
   }

   }

   export {uploadOnCloudinary,deleteFromCloudinary}
