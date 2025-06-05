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
  test("GET /api responds with status 200 and returns an object containing an 'endpoints' key with endpoint documentation", async () => {
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

describe.skip("/api/articles", () => {
  test("GET /api/articles responds with a status 200 and returns an object with key called articles and the value being an array of article objects in descending order and not include body property within any article object", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles").expect(200);
    expect(Array.isArray(articles)).toBe(true);
    for (let i = 0; i < articles.length - 1; i++) {
      expect(articles[i].created_at >= articles[i + 1].created_at).toBe(true);
    }
    for (const article of articles) {
      expect(typeof article.author).toBe("string");
      expect(typeof article.title).toBe("string");
      expect(typeof article.article_id).toBe("number");
      expect(typeof article.topic).toBe("string");
      expect(typeof article.created_at).toBe("string");
      expect(typeof article.votes).toBe("number");
      expect(typeof article.article_img_url).toBe("string");
      expect(typeof article.comment_count).toBe("number");

      expect(article).not.toHaveProperty("body");
    }
  });
});

describe.skip("Invalid paths", () => {
  test("GET / responds with a status 404 and returns an error message", async () => {
    const { body } = await request(app).get("/").expect(404);
    expect(body.message).toBe("Route not found");
  });
});
