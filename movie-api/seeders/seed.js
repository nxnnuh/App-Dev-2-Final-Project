const { sequelize, User, Movie, Watchlist } = require("../models");

async function seed() {
  // Wipe and recreate all tables (force: true drops existing data)
  await sequelize.sync({ force: true });

  const bcrypt = require("bcryptjs");

  // CREATE SEED USERS
  const user1 = await User.create({
    username: "angel",
    email: "angel@example.com",
    password: await bcrypt.hash("123456", 10),  // Always hash passwords
    role: "user",
  });

  const user2 = await User.create({
    username: "demo",
    email: "demo@example.com",
    password: await bcrypt.hash("123456", 10),
    role: "user",
  });

  // CREATE SEED MOVIES
  const movies = await Movie.bulkCreate([
    { title: "Inception", genre: "Sci-Fi", releaseYear: 2010, duration: 148, director: "Christopher Nolan" },
    { title: "Titanic", genre: "Romance", releaseYear: 1997, duration: 195, director: "James Cameron" },
    { title: "The Dark Knight", genre: "Action", releaseYear: 2008, duration: 152, director: "Christopher Nolan" },
    { title: "Interstellar", genre: "Sci-Fi", releaseYear: 2014, duration: 169, director: "Christopher Nolan" },
    { title: "The Matrix", genre: "Sci-Fi", releaseYear: 1999, duration: 136, director: "The Wachowskis" },
    { title: "Pulp Fiction", genre: "Crime", releaseYear: 1994, duration: 154, director: "Quentin Tarantino" },
    { title: "Forrest Gump", genre: "Drama", releaseYear: 1994, duration: 142, director: "Robert Zemeckis" },
    { title: "The Shawshank Redemption", genre: "Drama", releaseYear: 1994, duration: 142, director: "Frank Darabont" },
    { title: "Avengers: Endgame", genre: "Action", releaseYear: 2019, duration: 181, director: "Anthony and Joe Russo" },
    { title: "Spider-Man: Into the Spider-Verse", genre: "Animation", releaseYear: 2018, duration: 117, director: "Bob Persichetti" },
    { title: "Parasite", genre: "Thriller", releaseYear: 2019, duration: 132, director: "Bong Joon-ho" },
    { title: "The Godfather", genre: "Crime", releaseYear: 1972, duration: 175, director: "Francis Ford Coppola" },
  ]);

  // CREATE DEFAULT WATCHLISTS
  await Watchlist.create({
    name: "default watchlist",
    description: "add whatever you like!",
    UserId: user1.id,
  });

  await Watchlist.create({
    name: "default watchlist",
    description: "add whatever you like!",
    UserId: user2.id,
  });

  // CREATE CUSTOM WATCHLISTS
  const watchlist1 = await Watchlist.create({
    name: "Angel Favorites",
    description: "Top picks from angel",
    UserId: user1.id,
  });

  const watchlist2 = await Watchlist.create({
    name: "Demo List",
    description: "Movies to watch",
    UserId: user2.id,
  });

  // LINK MOVIES TO WATCHLISTS
  // addMovies is a Sequelize many-to-many helper
  await watchlist1.addMovies([movies[0], movies[2], movies[3], movies[4], movies[6]]);
  await watchlist2.addMovies([movies[1], movies[5], movies[7], movies[9], movies[10]]);

  console.log("Database seeded with users, movies, and watchlists!");
}

seed();

