const { sequelize, User, Movie, Watchlist } = require("../models");

async function seed() {
  // Reset data
  await sequelize.sync({ force: true });

  // USERS
  const user = await User.create({
    username: "angel",
    email: "angel@example.com"
  });

  // MOVIES
  const inception = await Movie.create({
    title: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    duration: 148,
    director: "Christopher Nolan"
  });

  const titanic = await Movie.create({
    title: "Titanic",
    genre: "Romance",
    releaseYear: 1997,
    duration: 195,
    director: "James Cameron"
  });

  const darkKnight = await Movie.create({
    title: "The Dark Knight",
    genre: "Action",
    releaseYear: 2008,
    duration: 152,
    director: "Christopher Nolan"
  });

  const interstellar = await Movie.create({
    title: "Interstellar",
    genre: "Sci-Fi",
    releaseYear: 2014,
    duration: 169,
    director: "Christopher Nolan"
  });

  //WATCHLISTS
  const watchlist = await Watchlist.create({
    name: "My Favorites",
    description: "Best movies ever",
    UserId: user.id
  });

  //LINK MOVIES
  await watchlist.addMovies([
    inception,
    titanic,
    darkKnight,
    interstellar
  ]);

  console.log("Database seeded with real movies!");
}

seed();