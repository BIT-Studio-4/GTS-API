import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};

const login = async (req, res) => {

};

export {
  register,
  login
};