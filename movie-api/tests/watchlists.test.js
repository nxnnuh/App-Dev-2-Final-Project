// Set a fixed JWT secret for consistent token generation during tests
process.env.JWT_SECRET = "supersecretkey123";
const { sequelize } = require("../models");

// Sync the database before running tests 
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

const request = require("supertest");
const app = require("../server");

// Store token for authenticated requests and watchlistId for CRUD operations
let token;
let watchlistId;

// Register and log in a user to obtain a valid JWT token before testing watchlist routes
beforeAll(async () => {
  // Register a new user for watchlist tests
  await request(app).post("/api/users/register").send({
    username: "watchuser",
    password: "123456",
  });

  // Log in the registered user to retrieve a JWT token
  const res = await request(app).post("/api/users/login").send({
    username: "watchuser",
    password: "123456",
  });

  token = res.body.token;
});

// Watchlist API Test Suite
// Validates full CRUD operations on watchlists with proper authentication
describe("Watchlist API", () => {
  // Test: Ensure an authenticated user can create a new watchlist
  it("should create a watchlist", async () => {
    const res = await request(app)
      .post("/api/watchlists")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "My Watchlist" });

    // Expect successful creation and capture the created watchlist ID
    expect(res.statusCode).toBe(201);

    watchlistId = res.body.id; // important for subsequent tests
  });

  // Test: Ensure the authenticated user can retrieve their watchlists
  it("should get user's watchlists", async () => {
    const res = await request(app)
      .get("/api/watchlists")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  // Test: Ensure the authenticated user can update their own watchlist
  it("should update OWN watchlist", async () => {
    const res = await request(app)
      .put(`/api/watchlists/${watchlistId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Name" });

    expect(res.statusCode).toBe(200);
  });

  // Test: Ensure the authenticated user can delete their own watchlist
  it("should delete OWN watchlist", async () => {
    const res = await request(app)
      .delete(`/api/watchlists/${watchlistId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
