import express from "express";
import { createSaveGame } from "../../../controllers/saveGame.js";

const router = express.Router();

router.post("/", createSaveGame);

export default router;