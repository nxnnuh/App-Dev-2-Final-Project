// ROLE AUTHORIZATION MIDDLEWARE
// Returns a middleware function that blocks requests
// unless the user's role matches the required role.
module.exports = (role) => {
  return (req, res, next) => {
    // req.user is set by auth middleware before this runs
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();  // Role matches, allow access
  };
};

