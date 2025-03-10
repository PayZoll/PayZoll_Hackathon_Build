const { verifyToken } = require("../utils/jwt");

const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" format

    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded; // Attach the decoded user information (payload) to the request object
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

const checkForEmployeer = (req, res, next) => {
  if (!req.user.isEmployeer) {
    return res.status(401).json({ message: "Permission denied" });
  }

  next();
};

const checkForEmployee = (req, res, next) => {
  if (req.user.isEmployeer) {
    return res.status(401).json({ message: "Permission denied" });
  }

  next();
};

module.exports = {
  isLoggedIn,
  checkForEmployeer,
  checkForEmployee,
};
