import express from "express";
import { 
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
} from "../../../controllers/item.js";
import { validateCreateItem, validateUpdateItem } from "../../../middleware/validation.js";

const router = express.Router();

// Run createItem on any POST request made to the /items route.
router.post("/", validateCreateItem, createItem);
// Run getItems when a GET request is made to /items
router.get("/", getItems);
// Run getItem whenever a GET request with the 'id' parameter is made to /items.
router.get("/:id", getItem);
// Run updateItem whenever a PUT request with the 'id' parameter is made to /items
router.put("/:id", validateUpdateItem, updateItem);
// Run deleteItem whenever a DELETE request is made to /items with the 'id' parameter.
router.delete("/:id", deleteItem);

export default router;