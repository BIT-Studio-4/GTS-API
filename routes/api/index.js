import express from "express";
import userRoutes from "./users/index.js";

// router is used to connect extra routes to the API through a custom instance.
const router = express.Router();

/* 
Example of a custom route that router passes to the API. 
The ".get()" is for a GET request, but you can use POST, PUT, DELETE, etc.
You can also make the code that runs on call into a method that will be saved elsewhere.
E.g., router.post("/", createUser);
*/ 
router.get("/", (req, res) => {
    res.send("Welcome to the GTS API!");
});
router.use("/users", userRoutes);

router.use("/users", userRoutes);

router.use("/users", userRoutes);

// This makes router the only output when imported elsewhere.
export default router;