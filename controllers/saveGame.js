import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

const createSaveGame = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({
        "msg": "Invalid Content-Type. Expected 'application/json'."  
      });
    
    let saveGame = await primsa.saveGame.findUnique({
      "where": { "id": String(req.body.id) },
    });

    if (saveGame) 
      return res.status(403).json({
        "msg": "Game save already exists!",
      });
    
    saveGame = await primsa.saveGame.create({
      "data": {
        "id": req.body.id,
        "money": req.body.store.money,
        "store": {
          "create": {
            "id": req.body.id,
            "store_objects": {
              "create": req.body.store.store_objects,
            },
          },
        },
        "inventory": {
          "create": {
            "id": req.body.id,
            "items": {
              "create": req.body.inventory.items,
            },
          },
        },
      },
    });

    return res.status(201).json({
      "msg": "Game save successfully created",
      "data": saveGame,
    });
  } catch (error) {
    return res.status(500).json({
      "msg": error.message,
    });
  }
};