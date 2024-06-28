import express from "express";
import { createUser } from "../../../controllers/user.js";

const router = express.Router();

// Run createUser on any POST request made to the /users route.
router.post("/", createUser);

export default router;