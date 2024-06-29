import express from "express";
import { 
  createUser,
  getUser,
} from "../../../controllers/user.js";

const router = express.Router();

// Run createUser on any POST request made to the /users route.
router.post("/", createUser);
// Run getUser whenever a GET request with the 'id' parameter is used.
router.get("/:id", getUser);

export default router;