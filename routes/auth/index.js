import express from "express";
import { register, login } from "../../controllers/auth.js";
import { validateAuth, validateCreateUser } from "../../middleware/validation.js";

const router = express.Router();

router.post("/register", validateCreateUser, register);
router.post("/login", validateAuth, login);

export default router;