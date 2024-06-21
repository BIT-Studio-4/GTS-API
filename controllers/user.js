import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    // Ensure that the request info is formatted correctly.
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({ "msg": "Invalid Content-Type. Expected 'application/json'." });

    let user = await prisma.user.findUnique({
      "where": { "name": String(req.body.name) },
    });

    // Check that a user with the same unique info doesn't already exist.
    if (user) return res.status(403).json({ "msg": "User already exists." });

  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};