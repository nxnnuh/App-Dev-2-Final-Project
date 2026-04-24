// Set a fixed JWT secret for consistent token generation during tests
process.env.JWT_SECRET = "supersecretkey123";
const { sequelize } = require("../models");

// Sync the database before running tests
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

const request = require("supertest");
const app = require("../server");

// Store token for authenticated requests
let token;

// Register and log in
beforeAll(async () => {
  await request(app).post("/api/users/register").send({
    username: "movieuser",
    password: "123456",
  });

  const res = await request(app).post("/api/users/login").send({
    username: "movieuser",
    password: "123456",
  });

  token = res.body.token;
});

// Movies API Test Suite
// Validates fetching movies with proper authentication
describe("Movies API", () => {
  // Test: Ensure movies can be retrieved when a valid Bearer token is provided
  it("should get movies with valid token", async () => {
    const res = await request(app)
      .get("/api/movies")
      .set("Authorization", `Bearer ${token}`);

    // Expect successful response
    expect(res.statusCode).toBe(200);
  });
});
