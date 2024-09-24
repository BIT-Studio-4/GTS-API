import express from "express";
import { register, login } from "../../controllers/auth.js";
import { validateAuth, validateMutateUser } from "../../middleware/validation.js";

const router = express.Router();

router.post("/register", validateMutateUser, register);
router.post("/login", validateAuth, login);

export default router;