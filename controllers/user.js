import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({ "msg": "Invalid Content-Type. Expected 'application/json'." });
    
  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};

export {
  updateUser
};