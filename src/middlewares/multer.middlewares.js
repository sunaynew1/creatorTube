import multer from "multer";
import path from "path";
import fs from "fs";
const uploadPath = path.join(process.cwd(), "public", "tmp");

// ✅ Make sure the directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}


const storage = multer.diskStorage({           //
    destination: function(req,file,cb){
        cb(null, uploadPath)
    },
    filename : function (req,file,cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(random() * 1E9)
        // cb(null,file.fieldname + '-' + uniqueSuffix)
      cb(null,file.originalname)
    }
})
const upload =multer({
    storage
}) 
    export default upload;
