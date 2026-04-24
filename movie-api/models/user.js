const { DataTypes } = require("sequelize");

// Define User model schema
module.exports = (sequelize) => {
  return sequelize.define("User", {
    // Unique login name (required)
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    // Optional email address
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Hashed password (never store plain text)
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Access level: "user" or "admin"
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  });
};

