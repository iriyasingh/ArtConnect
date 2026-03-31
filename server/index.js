import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database.js";
import authRoutes from "./routes/authRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";
import artworkRoutes from "./routes/artworkRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/artworks", artworkRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ArtConnect API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
