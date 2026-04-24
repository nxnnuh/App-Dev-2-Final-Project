// Set a fixed JWT secret for consistent token generation during tests
process.env.JWT_SECRET = "supersecretkey123";
const { sequelize } = require("../models");

// Sync the database before running tests 
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

const request = require("supertest");
const app = require("../server");

// Auth Routes Test Suite
// Validates user registration and login endpoints
describe("Auth Routes", () => {

  // Sample user credentials used across auth tests
  let testUser = {
    username: "testuser",
    password: "123456"
  };

  // Test: Ensure a new user can register successfully
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send(testUser);

    // Expect successful creation and correct username in response
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe(testUser.username);
  });

  // Test: Ensure a registered user can log in and receive a JWT token
  it("should login and return a token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send(testUser);

    // Expect successful login and token present in response body
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});
