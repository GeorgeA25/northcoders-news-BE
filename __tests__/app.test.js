const request = require("supertest");
const app = require("../app");
const endpointsJson = require("../endpoints.json");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});
describe.skip("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", async () => {
    const {
      body: { endpoints },
    } = await request(app).get("/api").expect(200);
    expect(endpoints).toEqual(endpointsJson);
  });
});

describe.skip("GET /api/topics", () => {
  test("GET /api/topics responds with status 200 and returns an object containing a 'topics' key, where the value is an array of topic objects each having 'slug' and 'description' properties", async () => {
    const {
      body: { topics },
    } = await request(app).get("/api/topics").expect(200);
    expect(Array.isArray(topics)).toBe(true);
    for (const topic of topics) {
      expect(typeof topic.slug).toBe("string");
      expect(typeof topic.description).toBe("string");
    }
  });
});
