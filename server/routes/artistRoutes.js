import { Router } from "express";
import { getArtists } from "../controllers/artistController.js";

const router = Router();

router.get("/", getArtists);

export default router;
