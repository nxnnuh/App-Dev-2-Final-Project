const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");  // For hashing passwords
const jwt = require("jsonwebtoken");  // For creating JWT tokens
const { User, Watchlist } = require("../models");  // Database models
const auth = require("../middleware/auth");  // Token verification middleware

// Secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// REGISTER NEW USER
// Creates a new user, hashes their password, and returns a token
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Hash password before saving 
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Auto-create a default watchlist for the new user
    await Watchlist.create({
      name: "default watchlist",
      description: "add whatever you like!",
      UserId: user.id,
    });

    // Generate JWT token with user info embedded
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return username and token so user is immediately logged in
    res.status(201).json({ username: user.username, token });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    // Handle duplicate username
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Handle validation errors
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ error: err.message });
  }
});

// LOGIN
// Checks credentials and returns a new JWT token
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare plain text password with hashed password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate fresh token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL USERS
// Admin-only: lists every user (no passwords shown)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "createdAt"],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PROMOTE TO ADMIN
// Changes a user's role to "admin" (needs secret key if not already admin)
router.put("/:id/role", auth, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role, secretKey } = req.body;

    // Must be admin OR know the secret key
    if (req.user.role !== "admin" && secretKey !== "makeadmin123") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only update the role field
    user.role = role || "admin";
    await user.save();

    res.json({ message: `User promoted to ${user.role}`, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE USER
// Admins can delete anyone; regular users can only delete themselves
router.delete("/:id", auth, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Block if not admin AND not deleting self
    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

