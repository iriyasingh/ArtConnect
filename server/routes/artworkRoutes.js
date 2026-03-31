import { Router } from "express";
import {
  addComment,
  createArtwork,
  getArtworkById,
  getArtworks,
} from "../controllers/artworkController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getArtworks);
router.get("/:id", getArtworkById);
router.post("/:id/comments", verifyToken, addComment);
router.post("/", verifyToken, createArtwork);

export default router;
