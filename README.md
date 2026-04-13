# App-Dev-2-Final-Project

#Project: Movie Watchlist API
This is a RESTful API that allows users to create and manage their movie watchlists. 
Users can add movies to their watchlists, view their watchlists, and remove movies 
from their watchlists.

# Technologies Used
- Node.js
- Express.js
- Sequelize (ORM)
- SQLite (Database)
- Postman (for testing)

# Database Models
- User: Represents a user of the application. Contains fields for username and email.
- Movie: Represents a movie. Contains fields for title, genre, and director.
- Watchlist: Represents a user's watchlist. Contains fields for name, description, and a foreign key to the User model.
- WatchlistMovies: A join table that represents the many-to-many relationship between Watchlists and Movies.
