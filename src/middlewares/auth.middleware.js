const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddlware(req, res, next) {
  const token = req.cookies.token || req.headers.authorizations?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);

    // 
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authMiddlware };
