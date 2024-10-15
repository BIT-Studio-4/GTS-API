import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

const createItem = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({
        "msg": "Invalid Content-Type. Expected 'application/json'.",
      });

    let item = await prisma.item.findUnique({
      "where": { "name": String(req.body.name) },
    });

    if (item) return res.status(403).json({ "msg": "Item already exists!" });
    
    item = await prisma.item.create({
      "data": { ...req.body },
    });

    return res.status(201).json({
      "msg": `Item ${item.name} successfully created!`,
      "data": item,
    });
  } catch (error) {
    return res.status(500).json({
      "msg": error.message,
    });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      "select": {
        "id": true,
        "name": true,
        "item_type": true,
        "cost": true,
      },
    });

    if (items.length === 0) return res.status(404).json({ "msg": "No items found!" });

    return res.status(200).json({
      "data": items,
    });
  } catch (error) {
    return res.status(500).json({
      "msg": error.message,
    });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      "where": { "id": String(req.params.id) },
      "select": {
        "id": true,
        "name": true,
        "item_type": true,
        "cost": true,
      },
    });

    if (!item) return res.status(404).json({ "msg": `Item ${req.params.id} not found!` });

    return res.status(200).json({
      "data": item,
    });
  } catch (error) {
    return res.status(500).json({
      "msg": error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({
        "msg": "Invalid Content-Type. Expected 'application/json'.",
      });

    let item = await prisma.item.findUnique({
      "where": { "id": String(req.params.id) }
    });

    if (!item) return res.status(404).json({ "msg": `Item ${req.params.id} not found!` });

    item = await prisma.item.update({
      "where": { "id": String(req.params.id) },
      "data": { ...req.body },
      "select": {
        "id": true,
        "name": true,
        "item_type": true,
        "cost": true,
      },
    });

    return res.status(200).json({
      "msg": `Item ${item.id} successfully updated!`,
      "data": item,
    });
  } catch (error) {
    return res.status(500).json({
      "msg": error.message,
    });
  }
};

export { createItem, getItems, getItem, updateItem };