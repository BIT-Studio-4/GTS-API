import jwt from "jsonwebtoken";

const authRoute = (req, res, next) => {
  try {
    // Check if a valid token has been provided
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(403).json({ "msg": "No token provided." });
  } catch (error) {
    return res.status(403).json({ "msg": "Not authorized to access this route." });
  }
};

export default authRoute;