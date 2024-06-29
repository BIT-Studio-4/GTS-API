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

    // Create a new user if all checks pass.
    user = await prisma.user.create({
      "data": { ...req.body },
    });

    // Return the newly created user if all processes were successful.
    return res.status(201).json({
      "msg": `User ${req.body.name} successfully created!`,
      "data": user,
    });
  } catch (error) {
    return res.status(500).json({ 
      "msg": error.message 
    });
  }
};

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
    return res.status(200).json({ 
      "data": users 
    });
  } catch (error) {
    return res.status(500).json({ 
      "msg": error.message 
    });
  }
};

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
    return res.status(500).json({ 
      "msg": error.message 
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Get the requested user.
    const queryUser = await prisma.user.findMany({
      // Search for a user with either an id or name that matches the id parameter.
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
  createUser,
  getUsers,
  getUser,
  deleteUser,
};