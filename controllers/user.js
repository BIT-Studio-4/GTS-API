import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async (req, res) => {
  try {
    const queryUser = await prisma.user.findMany({
      // Search for a user with either an id or name that matches the id parameter.
      "where": {
        "OR": [
          { "id": { "equals": String(req.params.id) }},
          { "name": { "equals": String(req.params.id) }},
        ],
      },
      // Only requests information that isn't confidential or dangerous.
      "select": {
        "id": true,
        "money": true,
        "name": true,
      },
    });
    const user = queryUser[0]; // Since findMany returns a list, take the first result. This should always work since the id and name fields require unique entries.

    // If the user doesn't exist, return a 404 not found response.
    if (!user) return res.status(404).json({ "msg": `User '${req.params.id}' not found.` });

    // If the request was successful, return the user and a 200 success status.
    return res.status(200).json({
      "data": user,
    });
  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};

export {
  getUser,
};