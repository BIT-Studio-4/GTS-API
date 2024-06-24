import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUser = async (req, res) => {
  try {
    // Get the requested user.
    const queryUser = await prisma.user.findMany({
      "where": {
        "OR": [
          { "id": { "equals": String(req.params.id) }},
          { "name": { "equals": String(req.params.id) }},
        ],
      },
    });
    const user = queryUser[0];

    // Check if the requested user exists, if not return a 404 not found response.
    if (!user) return res.status(404).json({ "msg": `User '${req.params.id}' not found.` });

    // Delete the user.
    await prisma.user.delete({
      "where": { "name": String(user.name) },
    });

    // If the delete request was successful return a 200 success message.
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