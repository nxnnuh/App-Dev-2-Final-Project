// Load environment variables from .env file
require("dotenv").config();

// Import express framework
const express = require("express");
const app = express();

// Import database connection
const { sequelize } = require("./models");

// Import middleware
const logger = require("./middleware/logger");          // Logs each request
const errorHandler = require("./middleware/errorHandler"); // Catches server errors
const auth = require("./middleware/auth");              // Verifies JWT tokens

// Import route handlers
const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/users");
const watchlistRoutes = require("./routes/watchlists");

// Parse incoming JSON request bodies
app.use(express.json());

// Log every incoming request
app.use(logger);

// PUBLIC routes, no token needed (register and login)
app.use("/api/users", userRoutes);

// PROTECTED routes, auth middleware checks token first
app.use("/api/movies", auth, movieRoutes);
app.use("/api/watchlists", auth, watchlistRoutes);

// Global error handler (must be last)
app.use(errorHandler);

// Server port from env or default 3000
const PORT = process.env.PORT || 3000;

// Start server only when not running tests
if (process.env.NODE_ENV !== "test") {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

// Export app for testing
module.exports = app;

