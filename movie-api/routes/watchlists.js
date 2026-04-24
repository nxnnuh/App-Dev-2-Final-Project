const express = require("express");
const router = express.Router();

const { Watchlist, Movie } = require("../models");  // Database models

// GET ALL WATCHLISTS
// Admin sees every watchlist, regular users see only their own
router.get("/", async (req, res) => {
  try {
    const where = req.user.role === "admin" ? {} : { UserId: req.user.id };
    const watchlists = await Watchlist.findAll({
      where,
      include: Movie,  // Include associated movies in the response
    });
    res.json(watchlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET WATCHLIST BY ID
// Admin can view any watchlist, users only their own
router.get("/:id", async (req, res) => {
  try {
    const where = { id: req.params.id };
    if (req.user.role !== "admin") {
      where.UserId = req.user.id;  // Restrict to own watchlist
    }

    const watchlist = await Watchlist.findOne({
      where,
      include: Movie,
    });

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE WATCHLIST
// Makes a new watchlist automatically owned by the logged-in user
router.post("/", async (req, res) => {
  try {
    const watchlist = await Watchlist.create({
      ...req.body,
      UserId: req.user.id,  // Force ownership to current user
    });

    res.status(201).json(watchlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE WATCHLIST 
// Only the owner can rename or change description
router.put("/:id", async (req, res) => {
  const watchlist = await Watchlist.findOne({
    where: {
      id: req.params.id,
      UserId: req.user.id,  // Must be the owner
    },
  });

  if (!watchlist) {
    return res.status(404).json({ error: "Watchlist not found" });
  }

  await watchlist.update(req.body);
  res.json(watchlist);
});

// DELETE WATCHLIST
// Owner or admin can delete
router.delete("/:id", async (req, res) => {
  const watchlist = await Watchlist.findByPk(req.params.id);

  if (!watchlist) {
    return res.status(404).json({ error: "Watchlist not found" });
  }

  // Reject if not admin AND not the owner
  if (req.user.role !== "admin" && watchlist.UserId !== req.user.id) {
    return res.status(404).json({ error: "Watchlist not found" });
  }

  await watchlist.destroy();
  res.json({ message: "Deleted" });
});

// ADD MOVIE TO WATCHLIST
// Links a movie to a watchlist (owner or admin)
router.post("/:id/movies/:movieId", async (req, res) => {
  try {
    const where = { id: req.params.id };
    if (req.user.role !== "admin") {
      where.UserId = req.user.id;
    }

    const watchlist = await Watchlist.findOne({ where });
    const movie = await Movie.findByPk(req.params.movieId);

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found or not owned by you" });
    }
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Many-to-many association method from Sequelize
    await watchlist.addMovie(movie);
    res.json({ message: "Movie added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REMOVE MOVIE FROM WATCHLIST
// Unlinks a movie from a watchlist (owner or admin)
router.delete("/:id/movies/:movieId", async (req, res) => {
  try {
    const where = { id: req.params.id };
    if (req.user.role !== "admin") {
      where.UserId = req.user.id;
    }

    const watchlist = await Watchlist.findOne({ where });
    const movie = await Movie.findByPk(req.params.movieId);

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found or not owned by you" });
    }
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    await watchlist.removeMovie(movie);
    res.json({ message: "Movie removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

