import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (req, res) => {
  try {
    // Check if the request is using the correct format for the API to parse.
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res.status(400).json({ "msg": "Invalid Content-Type. Expected 'application/json'." });
    
    // Get the requested user by the id/name.
    const queryUser = await prisma.user.findMany({
      "where": {
        "OR": [
          { "id": { "equals": String(req.params.id) }},
          { "name": { "equals": String(req.params.id) }},
        ],
      },
    });
    let user = queryUser[0];

    // Check if the user exists, if not return a 404 not found response.
    if (!user) return res.status(404).json({ "msg": `User '${req.params.id}' not found.` });

    // Update the user with the provided information.
    user = await prisma.user.update({
      "where": { "name": String(user.name) },
      "data": { ...req.body },
    });

    delete user.password; // Delete confidential info (password). More efficient than making another GET request.

    // If the update request was successful, return the new user with a 200 success message.
    return res.status(200).json({
      "msg": `User '${user.name} successfully updated!`,
      "data": user,
    });
  } catch (error) {
    return res.status(500).json({ "msg": error.message });
  }
};

export {
  updateUser,
};