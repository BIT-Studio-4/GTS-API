import express from "express";
import { updateUser } from "../../../controllers/user.js";

const router = express.Router();

// Run updateUser whenever a PUT request with the 'id' parameter is made to /users
router.put("/:id", updateUser);

export default router;