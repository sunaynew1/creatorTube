import express from "express"
import cors from "cors"
import https from "https"
import cookieParser from "cookie-parser"
import fs from "fs"
//import routes
import healthcheckRoutes  from "./routes/healthcheck.routes.js"
import path from 'path';
import router from "./routes/user.routes.js"
import { errorHandler } from "./middlewares/error.middlewares.js"
import { fileURLToPath } from 'url';

// const options = {
//     key: fs.readFileSync("private.key"),
//     cert: fs.readFileSync("certificate.crt"),
// };

const app = express()

app.use(
    cors({
        origin:["http://127.0.0.1:3004", "http://localhost:3004","https://creatortube-production.up.railway.app"],
        credentials: true 
    })
)
// const allowedOrigins = process.env.CORS_ORGIN ;
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );
// common middleware
// Serve static files from "public"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended :true , limit :"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes
app.use("/api/v1/healthCheck", healthcheckRoutes)
app.use("/api/v1/users", router)


app.use(errorHandler) 

// https.createServer(options, app).listen(5000, () => {
//     console.log("HTTPS server running on https://localhost:5000");
// });

export { app }