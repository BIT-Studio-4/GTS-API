import express from "express";
import { register, login } from "../../controllers/auth.js";
import { validateCreateUser } from "../../middleware/validation.js";

const router = express.Router();

router.post("/register", validateCreateUser, register);
router.post("/login", validateCreateUser, login);

export default router;