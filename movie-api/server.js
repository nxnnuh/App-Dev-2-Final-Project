require("dotenv").config();

const express = require("express");
const app = express();

const { sequelize } = require("./models");

// Import middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/users");
const watchlistRoutes = require("./routes/watchlists");

app.use(express.json());

// Middleware
app.use(logger);

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/watchlists", watchlistRoutes);

// Error handler 
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});