import express from "express";
import { createSaveGame } from "../../../controllers/saveGame.js";
import { validateCreateSaveGame } from "../../../middleware/validation.js";

const router = express.Router();

router.post("/", validateCreateSaveGame, createSaveGame);

export default router;