const jwt = require("jsonwebtoken");

// Secret must match the one used to sign tokens
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// AUTH MIDDLEWARE
// Verifies the Bearer token in the Authorization header.
// If valid, attaches decoded user info to req.user so routes can use it.
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Reject if header is missing
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Expect format "Bearer <token>"
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = parts[1];

  try {
    // Verify token signature and expiry
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user payload (id, username, role) to request object
    req.user = decoded;

    next();  // Continue to the actual route handler
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

