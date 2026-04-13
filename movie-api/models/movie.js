const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Movie", {
    // Movie title (required)
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Optional
    genre: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    director: DataTypes.STRING
  });
};