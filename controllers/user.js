import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async (req, res) => {
  try {
    const queryUser = await prisma.user.findMany({
      "where": {
        "OR": [
          { "id": { "equals": String(req.params.id) }},
          { "name": { "equals": String(req.params.id) }},
        ],
      },
    });
    const user = queryUser[0];

    if (!user) return res.status(404).json({ "msg": `User ${req.params.id} not found.` });

  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};

export {
  getUser,
};