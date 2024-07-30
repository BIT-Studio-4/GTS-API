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

    // Save the received user payload from the token to the request
    // E.g., 
    // {
    //    "id": "...",
    //    "name": "...",
    // }
    req.user = payload; 

    // If all checks passed and the payload was saved, allow the request to continue
    return next();
  } catch (error) {
    // Return an invalid access error if an error occured during the validation process
    return res.status(403).json({ "msg": "Not authorized to access this route." });
  }
};

export default authRoute;