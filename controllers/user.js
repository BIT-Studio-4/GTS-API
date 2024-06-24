import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUser = async (req, res) => {
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

    if (!user) return res.status(404).json({ "msg": `User '${req.params.id}' not found.` });

    await prisma.user.delete({
      "where": { "name": String(user.name) },
    });

    return res.status(200).json({
      "msg": `User '${user.name}' successfully deleted!`,
    });
  } catch (error) {
    return res.status(500).json({
      "msg": error.message,
    });
  }
};

export {
  deleteUser
};