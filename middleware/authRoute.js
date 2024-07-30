import jwt from "jsonwebtoken";

const authRoute = (req, res, next) => {
  try {
    // Check if a valid token has been provided
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(403).json({ "msg": "No token provided." });

    // Check if the token is valid in the API
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload; // Save the received user payload from the token to the request

    return next();
  } catch (error) {
    return res.status(403).json({ "msg": "Not authorized to access this route." });
  }
};

export default authRoute;