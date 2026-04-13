const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("User", {
    // Username (required)
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Email (required)
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};