const jwt = require("jsonwebtoken");
require("dotenv");
const jwtSecret = process.env.JWT_SECRET;

const verifyJWT = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const decoded = jwt.verify(accessToken, jwtSecret);
    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(403).json({ Error: "Invalid token" });
  }
};

module.exports = verifyJWT;
