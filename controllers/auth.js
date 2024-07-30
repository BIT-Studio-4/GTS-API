import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    // Check if the request is formatted correctly
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({ "msg": "Invalid Content-Type. Expected 'application/json'." });

    let user = await prisma.user.findUnique({
      "where": { "name": String(req.body.name) },
    });

    if (user) return res.status(409).json({ "msg": "User already exists." });

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    user = await prisma.user.create({
      "data": { ...req.body },
    });
    delete user.password;

    return res.status(201).json({
      "msg": `User ${user.name} successfully created!`,
      "data": user,
    });
  } catch (error) {
    return res.status(500).json({ 
      "msg": error.message,
    });
  }
};

const login = async (req, res) => {

};

export {
  register,
  login
};