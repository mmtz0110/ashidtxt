import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/posts", postRoutes);

export default app;
