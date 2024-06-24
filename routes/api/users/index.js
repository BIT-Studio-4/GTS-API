import express from "express";
import { deleteUser } from "../../../controllers/user.js";

const router = express.Router();

// Run deleteUser whenever a DELETE request is made to /users with the 'id' parameter.
router.delete("/:id", deleteUser);

export default router;