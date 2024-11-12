import express from "express";
import { 
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../../../controllers/user.js";
import { validateCreateUser, validateUpdateUser } from "../../../middleware/validation.js";

const router = express.Router();

// Run createUser on any POST request made to the /users route.
router.post("/", validateCreateUser, createUser);
// Run getUsers when a GET request is made to /users
router.get("/", getUsers);
// Run getUser whenever a GET request with the 'id' parameter is used.
router.get("/:id", getUser);
// Run updateUser whenever a PUT request with the 'id' parameter is made to /users
router.put("/:id", validateUpdateUser, updateUser);
// Run deleteUser whenever a DELETE request is made to /users with the 'id' parameter.
router.delete("/:id", deleteUser);

export default router;