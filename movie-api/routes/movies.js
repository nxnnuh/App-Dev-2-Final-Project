const express = require("express");
const router = express.Router();

const { Movie } = require("../models");

// GET all movies
router.get("/", async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
});

// GET movie by ID
router.get("/:id", async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

// CREATE movie
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE movie
router.put("/:id", async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  await movie.update(req.body);
  res.json(movie);
});

// DELETE movie
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  await movie.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;