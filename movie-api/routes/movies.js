const express = require("express");
const router = express.Router();

const { Movie } = require("../models");  // Movie database model

// GET ALL MOVIES
// Returns every movie in the database
router.get("/", async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
});

// GET MOVIE BY ID
// Returns a single movie matching the URL id parameter
router.get("/:id", async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

// CREATE MOVIE
// Adds a new movie using the request body JSON
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE MOVIE
// Modifies an existing movie by ID
router.put("/:id", async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  await movie.update(req.body);
  res.json(movie);
});

// DELETE MOVIE
// Removes a movie from the database
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  await movie.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;

