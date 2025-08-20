import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import healthcheckRoutes from "./routes/healthcheck.routes.js";
import router from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

const app = express();

const allowedOrigins = [
  "https://creator-tube-todos-projects-0a36388c.vercel.app",
  "https://creatortube-production.up.railway.app",
  "http://localhost:3004"

];

app.use(
  cors({
    origin:allowedOrigins,
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/healthCheck", healthcheckRoutes);
app.use("/api/v1/users", router);

app.use(errorHandler);

export { app };
