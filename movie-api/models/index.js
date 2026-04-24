// Load environment variables (database path)
require("dotenv").config();

// Import Sequelize ORM
const { Sequelize } = require("sequelize");

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "./database.sqlite"
});

// Import model definitions
const User = require("./user")(sequelize);
const Movie = require("./movie")(sequelize);
const Watchlist = require("./watchlist")(sequelize);

const WatchlistMovie = sequelize.define("WatchlistMovie");

// Define relationships
User.hasMany(Watchlist);           // One user can have many watchlists
Watchlist.belongsTo(User);         // Each watchlist belongs to one user

Watchlist.belongsToMany(Movie, { through: WatchlistMovie }); // Watchlist has many movies
Movie.belongsToMany(Watchlist, { through: WatchlistMovie }); // Movie appears in many watchlists

// Export database and models for use in routes
module.exports = { sequelize, User, Movie, Watchlist };

