import express from "express";
import { createSaveGame, getSaveGame, deleteSaveGame } from "../../../controllers/saveGame.js";
import { validateCreateSaveGame } from "../../../middleware/validation.js";

const router = express.Router();

// Run createSaveGame on any POST request made to the /save_games route.
router.post("/", validateCreateSaveGame, createSaveGame);
// Run getItem whenever a GET request with the 'id' parameter is made to /save_games.
router.get("/:id", getSaveGame);
// Run deleteItem whenever a DELETE request with the 'id' parameter is made to /save_games.
router.delete("/:id", deleteSaveGame);

export default router;