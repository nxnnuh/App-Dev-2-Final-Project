const { DataTypes } = require("sequelize");

// Define Watchlist model schema
module.exports = (sequelize) => {
  return sequelize.define("Watchlist", {
    // Watchlist name (required)
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Optional description text
    description: DataTypes.STRING
  });
};

