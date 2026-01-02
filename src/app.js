import express from "express";
import cors from "cors";
import authRoutes from "src/routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

export default app;
