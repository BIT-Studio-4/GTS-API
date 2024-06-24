import express from "express";
import { getUser } from "../../../controllers/user.js";

const router = express.Router();

// Run getUser whenever a GET request with the 'id' parameter is used.
router.get("/:id", getUser);

export default router;