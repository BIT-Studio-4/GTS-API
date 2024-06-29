import express from "express";
import { 
  createUser,
  getUsers,
  getUser,
  deleteUser,
} from "../../../controllers/user.js";

const router = express.Router();

// Run createUser on any POST request made to the /users route.
router.post("/", createUser);
// Run getUsers when a GET request is made to /users
router.get("/", getUsers);
// Run getUser whenever a GET request with the 'id' parameter is used.
router.get("/:id", getUser);
// Run deleteUser whenever a DELETE request is made to /users with the 'id' parameter.
router.delete("/:id", deleteUser);

export default router;