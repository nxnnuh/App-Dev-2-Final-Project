const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Watchlist", {
    // Watchlist name (required)
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Optional description
    description: DataTypes.STRING
  });
};