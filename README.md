# App-Dev-2-Final-Project

## Project: Movie Watchlist API
The Movie Watchlist API is a RESTful backend application that allows users to create, manage, and organize their own movie watchlists.
This project demonstrates a production-ready API with authentication, role-based authorization, and secure data handling.

## SUMMARY 
My final project is a Movie Collection and Watchlist REST API built using Node.js, Express, Sequelize, and SQLite. This API allows users to create and manage a collection of movies, organize them into watchlists, and perform full CRUD operations on users, movies, and watchlists. The project is designed around a relational database structure, including a one-to-many relationship between users and watchlists, and a many-to-many relationship between watchlists and movies. This allows for flexible organization of data and reflects real-world application design. 

This project highlights my skills in backend development, particularly in building RESTful APIs with proper routing, middleware, and error handling. I implemented features such as JSON request parsing, logging middleware, and centralized error handling to ensure consistent and reliable API behavior. One challenge I encountered during development was an issue with request bodies not being processed correctly due to middleware order. Fixing this helped me better understand how Express handles middleware and request flow, and improved my debugging skills. 

Overall, this project demonstrates my ability to design and build a structured backend system, work with relational databases, and implement scalable API endpoints. 

## Users can:
- Register and log in securely
- Create and manage personal watchlists
- Add and remove movies from watchlists
- Access only their own data (ownership enforced)
- Perform actions based on their role (user/admin)


## Technologies Used
- Node.js
- Express.js
- Sequelize (ORM)
- SQLite (Development Database)
- PostgreSQL (Recommended for production / Render)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Jest & Supertest for testing
- Postman for API testing

## Authentication
This API uses **JWT (JSON Web Tokens)** for secure authentication.
- Users must log in to receive a token
- Tokens must be included in protected routes

## User Roles
- users can manage their own watchlists
- admins can delete movies and access all resources

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

## Setup Instructions

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

# base url
http://localhost:3000/api


