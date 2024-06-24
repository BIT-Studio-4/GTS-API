import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({ "msg": "Invalid Content-Type. Expected 'application/json'." });
    
    const queryUser = await prisma.user.findMany({
      "where": {
        "OR": [
          { "id": { "equals": String(req.params.id) }},
          { "name": { "equals": String(req.params.id) }},
        ],
      },
    });
    let user = queryUser[0];

    if (!user) return res.status(404).json({ "msg": `User '${req.params.id}' not found.` });

    user = await prisma.user.update({
      "where": { "name": String(user.name) },
      "data": { ...req.body },
    });

  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};

export {
  updateUser
};