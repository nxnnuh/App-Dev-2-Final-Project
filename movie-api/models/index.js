// Load environment variables
require("dotenv").config();

const { Sequelize } = require("sequelize");

// Create Sequelize instance (SQLite database)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "./database.sqlite"
});

// Import models
const User = require("./user")(sequelize);
const Movie = require("./movie")(sequelize);
const Watchlist = require("./watchlist")(sequelize);

// Create join table 
const WatchlistMovie = sequelize.define("WatchlistMovie");

// One user many watchlists
User.hasMany(Watchlist);

// Each watchlist belongs to one user
Watchlist.belongsTo(User);

// Many to many watchlists movies
Watchlist.belongsToMany(Movie, { through: WatchlistMovie });
Movie.belongsToMany(Watchlist, { through: WatchlistMovie });

// Export everything
module.exports = { sequelize, User, Movie, Watchlist };