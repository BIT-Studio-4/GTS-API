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

export { createItem };