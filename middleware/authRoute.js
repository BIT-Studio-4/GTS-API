import jwt from "jsonwebtoken";

const authRoute = (req, res, next) => {
  try {
    
  } catch (error) {
    return res.status(403).json({ "msg": "Not authorized to access this route." });
  }
};

export default authRoute;