// Set a fixed JWT secret for consistent token generation during tests
process.env.JWT_SECRET = "supersecretkey123";
const { sequelize } = require("../models");

// Sync the database before running tests 
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

const request = require("supertest");
const app = require("../server");

// Store tokens for two separate users and a watchlist ID for ownership tests
let user1Token;
let user2Token;
let watchlistId;

// Setup: Register and log in two users, have User 1 create a watchlist for ownership testing
beforeAll(async () => {
  // Register and log in User 1
  await request(app).post("/api/users/register").send({
    username: "user1",
    password: "123456"
  });

  const res1 = await request(app).post("/api/users/login").send({
    username: "user1",
    password: "123456"
  });

  user1Token = res1.body.token;

  // Register and log in User 2
  await request(app).post("/api/users/register").send({
    username: "user2",
    password: "123456"
  });

  const res2 = await request(app).post("/api/users/login").send({
    username: "user2",
    password: "123456"
  });

  user2Token = res2.body.token;

  // User 1 creates a private watchlist to test ownership enforcement
  const wl = await request(app)
    .post("/api/watchlists")
    .set("Authorization", `Bearer ${user1Token}`)
    .send({ name: "Private List" });

  watchlistId = wl.body.id;
});

// Security Tests (Ownership) Test Suite
// Validates that users cannot modify or delete resources owned by another user
describe("Security Tests (Ownership)", () => {

  // Test: Ensure User 2 cannot delete a watchlist created by User 1
  it("user2 should NOT delete user1 watchlist", async () => {
    const res = await request(app)
      .delete(`/api/watchlists/${watchlistId}`)
      .set("Authorization", `Bearer ${user2Token}`);

    // Expect forbidden or not found depending on authorization logic
    expect(res.statusCode).toBe(404); 
  });

});
