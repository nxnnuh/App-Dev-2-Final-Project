# App-Dev-2-Final-Project

#Project: Movie Watchlist API
The Movie Watchlist API is a RESTful backend application that allows users to create, manage, and organize their own movie watchlists.
This project demonstrates a production-ready API with authentication, role-based authorization, and secure data handling.

Users can:
- Register and log in securely
- Create and manage personal watchlists
- Add and remove movies from watchlists
- Access only their own data (ownership enforced)
- Perform actions based on their role (user/admin)


# Technologies Used
- Node.js
- Express.js
- Sequelize (ORM)
- SQLite (Development Database)
- PostgreSQL (Recommended for production / Render)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Jest & Supertest for testing
- Postman for API testing

### Authentication
This API uses **JWT (JSON Web Tokens)** for secure authentication.
- Users must log in to receive a token
- Tokens must be included in protected routes

## User Roles
user - can manage their own watchlists
admin - can delete movies and access all resources

## Database Models
### User
- id
- username
- password (hashed)
- role

### Movie
- id
- title
- genre
- director

### Watchlist
- id
- name
- description
- UserId (owner)

### WatchlistMovies
- WatchlistId
- MovieId

##Setup Instructions

### 1. Clone repository
git clone https://github.com/nxnnuh/App-Dev-2-Final-Project.git
cd App-Dev-2-Final-Project

### 2. Install dependencies
npm install

### 3. create '.env' file
JWT_SECRET=your_secret_key

### 4. Run the server
npm start

### 5. Run Tests
npm test

#base url
http://localhost:3000/api