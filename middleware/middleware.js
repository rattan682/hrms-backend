const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  try {
    const token = req.cookies["hrtoken"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token present", notauthorized: true });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Not authorized", notauthorized: true });
  }
};

module.exports = middleware;
