import dotenv from "dotenv";
import app from "./app.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use("/api/posts", postRoutes);
app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
