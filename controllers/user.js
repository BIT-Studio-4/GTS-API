import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {

  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};