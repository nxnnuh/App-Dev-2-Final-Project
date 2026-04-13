const express = require("express");
const router = express.Router();

const { Watchlist, Movie } = require("../models");

// GET all watchlists
router.get("/", async (req, res) => {
  const watchlists = await Watchlist.findAll({ include: Movie });
  res.json(watchlists);
});

// GET watchlist by ID
router.get("/:id", async (req, res) => {
  const watchlist = await Watchlist.findByPk(req.params.id, {
    include: Movie
  });

  if (!watchlist) {
    return res.status(404).json({ error: "Watchlist not found" });
  }

  res.json(watchlist);
});

// CREATE watchlist
router.post("/", async (req, res) => {
  try {
    const watchlist = await Watchlist.create(req.body);
    res.status(201).json(watchlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE watchlist
router.put("/:id", async (req, res) => {
  const watchlist = await Watchlist.findByPk(req.params.id);

  if (!watchlist) {
    return res.status(404).json({ error: "Watchlist not found" });
  }

  await watchlist.update(req.body);
  res.json(watchlist);
});

// DELETE watchlist
router.delete("/:id", async (req, res) => {
  const watchlist = await Watchlist.findByPk(req.params.id);

  if (!watchlist) {
    return res.status(404).json({ error: "Watchlist not found" });
  }

  await watchlist.destroy();
  res.json({ message: "Deleted" });
});

// ADD MOVIE TO WATCHLIST
router.post("/:id/movies/:movieId", async (req, res) => {
  const watchlist = await Watchlist.findByPk(req.params.id);
  const movie = await Movie.findByPk(req.params.movieId);

  if (!watchlist || !movie) {
    return res.status(404).json({ error: "Not found" });
  }

  await watchlist.addMovie(movie);

  res.json({ message: "Movie added to watchlist" });
});

// REMOVE MOVIE FROM WATCHLIST
router.delete("/:id/movies/:movieId", async (req, res) => {
  const watchlist = await Watchlist.findByPk(req.params.id);
  const movie = await Movie.findByPk(req.params.movieId);

  if (!watchlist || !movie) {
    return res.status(404).json({ error: "Not found" });
  }

  await watchlist.removeMovie(movie);

  res.json({ message: "Movie removed from watchlist" });
});

module.exports = router;