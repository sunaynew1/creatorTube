import {Router} from "express"
import { healthcheck } from "../controllers/healthcheck.controllers.js"
import upload from "../middlewares/multer.middlewares.js";

const router = Router()


router.route("/").get(healthcheck)
router.route("/test").get(healthcheck)
router.route("/").get(upload.single("file"), healthcheck)


export default router