import express from "express";
import { 
  createUser,
  getUser,
  deleteUser,
} from "../../../controllers/user.js";

// Run createUser on any POST request made to the /users route.
router.post("/", createUser);
// Run getUser whenever a GET request with the 'id' parameter is used.
router.get("/:id", getUser);
// Run deleteUser whenever a DELETE request is made to /users with the 'id' parameter.
router.delete("/:id", deleteUser);

export default router;