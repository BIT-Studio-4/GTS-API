import express from "express";
import { getUsers } from "../../../controllers/user.js";

const router = express.Router();

// Run getUsers when a GET request is made to /users
router.get("/", getUsers);

export default router;