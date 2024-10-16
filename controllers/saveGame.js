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

    if (saveGame) {
      await primsa.saveGame.delete({
        "where": { "id": String(req.body.id) },
      });
    }
    
    saveGame = await primsa.saveGame.create({
      "data": {
        "id": req.body.id,
        "money": req.body.money,
      },
    });

    // Create save for placed items
    const store = await primsa.store.create({
      "data": {
        "id": req.body.id,
      },
    });

    const objectsCopy = req.body.store.store_objects;
    objectsCopy.map((so, i) => req.body.store.store_objects[i].store_id = store.id);

    await primsa.storeObject.createMany({
      "data": req.body.store.store_objects,
    });

    // Create save for inventory
    const inventory = await primsa.inventory.create({
      "data": {
        "id": req.body.id,
      },
    });

    const itemsCopy = req.body.inventory.items;
    itemsCopy.map((item, i) => req.body.inventory.items[i].inventory_id = inventory.id);

    await primsa.inventoryItem.createMany({
      "data": req.body.inventory.items,
    });

    saveGame = await primsa.saveGame.findUnique({
      "where": { "id": String(req.body.id) },
      "select": {
        "id": true,
        "money": true,
        "store": {
          "select": {
            "store_objects": {
              "select": {
                "item_id": true,
                "x_pos": true,
                "y_pos": true,
                "z_pos": true,
                "y_rot": true,
              }
            }
          },
        },
        "inventory": {
          "select": {
            "items": {
              "select": {
                "item_id": true,
                "quantity": true,
              },
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

export { createSaveGame };