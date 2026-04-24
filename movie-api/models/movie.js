const { DataTypes } = require("sequelize");

// Define Movie model schema
module.exports = (sequelize) => {
  return sequelize.define("Movie", {
    // Movie title (required)
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Optional movie details
    genre: DataTypes.STRING,        // e.g. "Sci-Fi", "Action"
    releaseYear: DataTypes.INTEGER, // Year movie came out
    duration: DataTypes.INTEGER,    // Runtime in minutes
    director: DataTypes.STRING      // Director's name
  });
};

