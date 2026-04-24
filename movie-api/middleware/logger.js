// REQUEST LOGGER
// Prints HTTP method and URL for every incoming request.
module.exports = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // Pass control to the next middleware/route
};

