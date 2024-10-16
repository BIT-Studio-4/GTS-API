import express from "express";
import { createSaveGame } from "../../../controllers/saveGame.js";
import { validateCreateSaveGame } from "../../../middleware/validation.js";

const router = express.Router();

// Run createSaveGame on any POST request made to the /save_games route.
router.post("/", validateCreateSaveGame, createSaveGame);

export default router;