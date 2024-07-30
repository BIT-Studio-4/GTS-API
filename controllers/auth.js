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

    // Check if a user with the same name already exists
    let user = await prisma.user.findUnique({
      "where": { "name": String(req.body.name) },
    });

    if (user) return res.status(409).json({ "msg": "User already exists." });

    // Encrypt the user's password with a salt and a hash
    // The salt means that the hash is always different even if the password is the same as another user
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // If all checks pass, create new user with newly hashed password
    user = await prisma.user.create({
      "data": { ...req.body },
    });
    delete user.password;

    // Return the user without password if user creation was successful
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
  try {
    // Check if the request is formatted correctly
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({ "msg": "Invalid Content-Type. Expected 'application/json'." });

    // Check if the requested user exists before attempting to login
    let user = await prisma.user.findUnique({
      "where": { "name": String(req.body.name) },
    });

    if (!user) return res.status(401).json({ "msg": "Invalid username or password." });

    // Check if the supplied password matches the request user's password
    // Since the password in the db is encrypted, it needs to compare it to the hashed password and check if the passwords are the same
    const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(401).json({ "msg": "Invalid username or password." });

    delete user.password;

    const token = jwt.sign({
      "id": user.id,
      "name": user.name,
    }, process.env.JWT_SECRET, { "expiresIn": process.env.JWT_LIFETIME });

    user.token = token;

    return res.status(200).json({
      "msg": `User ${user.name} successfully logged in!`,
      "data": user,
    });
  } catch (error) {
    return res.status(500).json({ 
      "msg": error.message,
    });
  }
};

export {
  register,
  login
};