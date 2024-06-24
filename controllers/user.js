import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      // Request only the name and money fields when querying the database. Makes sure it won't provide anything confidential or dangerous.
      "select": {
        "name": true,
        "money": true,
      },
    });

    // If the database couldn't find any users, return a 404 not found response.
    if (users.length === 0) return res.status(404).json({ "msg": "No users found." });

    // If the query was successful, return the users with a 200 success response.
    return res.status(200).json({ "data": users });
  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};

export {
  getUsers
};