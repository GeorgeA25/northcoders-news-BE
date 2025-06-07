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
describe("GET /api", () => {
  test("GET /api responds with status 200 and returns an object containing an 'endpoints' key with endpoint documentation", async () => {
    const {
      body: { endpoints },
    } = await request(app).get("/api").expect(200);
    expect(endpoints).toEqual(endpointsJson);
  });
});

describe("GET /api/topics", () => {
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

describe("/api/articles", () => {
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

describe("GET /api/users", () => {
  test("GET /api/users responds with status 200 and returns an object containing a 'users' key, where the value is an array of topic objects each having 'username', 'name and 'avatar_url' properties", async () => {
    const {
      body: { users },
    } = await request(app).get("/api/users").expect(200);
    expect(Array.isArray(users)).toBe(true);
    for (const user of users) {
      expect(typeof user.username).toBe("string");
      expect(typeof user.name).toBe("string");
      expect(typeof user.avatar_url).toBe("string");
    }
  });
});

describe("GET /api/articles/:article_id", () => {
  test("GET /api/articles/:article_id responds with a status 200 and returns an object with a key of article and the value of an article object with correcet properties", async () => {
    const { body } = await request(app).get("/api/articles/1").expect(200);
    const article = body.article;
    expect(typeof article.article_id).toBe("number");
    expect(typeof article.title).toBe("string");
    expect(typeof article.author).toBe("string");
    expect(typeof article.body).toBe("string");
    expect(typeof article.created_at).toBe("string");
    expect(typeof article.votes).toBe("number");
    expect(typeof article.topic).toBe("string");
    expect(typeof article.article_img_url).toBe("string");
  });
  test("GET /api/articles/NAN responds with a 400 when the article_id is invalid and will return a message of 'Bad request'", async () => {
    const { body } = await request(app).get("/api/articles/NAN").expect(400);
    expect(body.message).toBe("Bad request");
  });
  test("GET /api/articles/800 responds with a 404 when the article_id is valid but doesn't exisit in the database will return a message of 'Article not found'", async () => {
    const { body } = await request(app).get("/api/articles/800").expect(404);
    expect(body.message).toBe("Article not found");
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("GET /api/articles/:article_id/comments responds with a status 200 and returns an object with a key of comments and the value to be an array of comments for the correct article_id", async () => {
    const {
      body: { comments },
    } = await request(app).get("/api/articles/1/comments").expect(200);
    expect(Array.isArray(comments)).toBe(true);
    for (let i = 0; i < comments.length - 1; i++) {
      expect(
        new Date(comments[i].created_at) >= new Date(comments[i + 1].created_at)
      ).toBe(true);
    }
    for (const comment of comments) {
      expect(typeof comment.comment_id).toBe("number");
      expect(typeof comment.votes).toBe("number");
      expect(typeof comment.created_at).toBe("string");
      expect(typeof comment.author).toBe("string");
      expect(typeof comment.body).toBe("string");
      expect(typeof comment.article_id).toBe("number");
    }
  });
  test("GET /api/articles/NAN/comments responds with a status 400 when the article is invalid and returns a message 'Bad request'", async () => {
    const { body } = await request(app)
      .get("/api/articles/NAN/comments")
      .expect(400);
    expect(body.message).toBe("Bad request");
  });
  test("GET /api/articles/article_id/comments responds with a status 404 when article_id is valid but doesn't exist in the database will return a message 'Article not found'", async () => {
    const { body } = await request(app)
      .get("/api/articles/800/comments")
      .expect(404);
    expect(body.message).toBe("Article not found");
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("POST /api/articles/:article_id/comments responds with a status 201 when comments object accepts an object with username and body properties with the value of the posted comment", async () => {
    const newComment = {
      username: "butter_bridge",
      body: "A test comment",
    };
    const { body } = await request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201);
    expect(body.comment).toMatchObject({
      author: "butter_bridge",
      body: "A test comment",
      article_id: 1,
    });
    const comment = body.comment;
    expect(typeof comment.comment_id).toBe("number");
    expect(typeof comment.author).toBe("string");
    expect(typeof comment.body).toBe("string");
    expect(typeof comment.article_id).toBe("number");
    expect(typeof comment.created_at).toBe("string");
    expect(typeof comment.votes).toBe("number");
  });
  test("POST /api/articles/:article_id/comments responds with a status 400 when username is missing", async () => {
    const newComment = { body: "Missed username" };
    const { body } = await request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400);
    expect(body.message).toBe("Missing required fields");
  });
  test("POST /api/articles/:article_id/comments responds with a status 400 when body is missing", async () => {
    const newComment = { username: "butter_bridge" };
    const { body } = await request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400);
    expect(body.message).toBe("Missing required fields");
  });
  test("POST /api/articles/:article_id/comments responds with a status 400 when article_id is not a number", async () => {
    const newComment = {
      username: "butter_bridge",
      body: "Invalid article_id",
    };
    const { body } = await request(app)
      .post("/api/articles/NAN/comments")
      .send(newComment)
      .expect(400);
    expect(body.message).toBe("Bad request");
  });
  test("POST /api/articles/:article_id/comments responds with a status 404 if article doesn't exist", async () => {
    const newComment = {
      username: "butter_bridge",
      body: "Invalid article_id",
    };
    const { body } = await request(app)
      .post("/api/articles/800/comments")
      .send(newComment)
      .expect(404);
    expect(body.message).toBe("Article not found");
  });
  test("POST /api/articles/:article_id/comments responds with a status 404 if user doesn't exist", async () => {
    const newComment = {
      username: "nonexistentuser",
      body: "User doesn't exsits",
    };
    const { body } = await request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404);
    expect(body.message).toBe("User not found");
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("PATCH /api/articles/:article_id responds with a status 200 and returns an object with a key of 'article' containing the updated article with votes incremented by the value in inc_votes property with the value of 1", async () => {
    const {
      body: { article },
    } = await request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(200);
    expect(article.article_id).toBe(1);
    expect(typeof article.article_id).toBe("number");
    expect(article.votes).toBeGreaterThanOrEqual(1);
    expect(typeof article.votes).toBe("number");
    expect(typeof article.title).toBe("string");
    expect(typeof article.author).toBe("string");
    expect(typeof article.body).toBe("string");
    expect(typeof article.created_at).toBe("string");
    expect(typeof article.topic).toBe("string");
    expect(typeof article.article_img_url).toBe("string");
  });
  test("PATCH /api/articles/:article_id responds with a status 200 and returns an object with a key of 'article' containing the updated article with votes decremented by the value in inc_votes property with the value of -100", async () => {
    const {
      body: { article },
    } = await request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -100 })
      .expect(200);
    expect(article.article_id).toBe(1);
    expect(article.votes).toBeLessThanOrEqual(0);
    expect(typeof article.votes).toBe("number");
  });
  test("PATCH /api/articles/:article_id responds with a 400 when passed an article_id that is NAN", async () => {
    const { body } = await request(app)
      .patch("/api/articles/NAN")
      .send({ inc_votes: 1 })
      .expect(400);
    expect(body.message).toBe("Bad request");
  });
  test("PATCH /api/articles/:article_id responds with a 400 when inc_votes is missing from the request body", async () => {
    const { body } = await request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400);
    expect(body.message).toBe("Bad request");
  });
  test("PATCH /api/articles/:article_id responds with a 400 when inc_votes property is NAN", async () => {
    const { body } = await request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "NAN" })
      .expect(400);
    expect(body.message).toBe("Bad request");
  });
  test("PATCH /api/articles/:article_id responds with a 404 when article_id is valid but is not in the articles table", async () => {
    const { body } = await request(app)
      .patch("/api/articles/800")
      .send({ inc_votes: 1 })
      .expect(404);
    expect(body.message).toBe("Article not found");
  });
});

describe("Invalid paths", () => {
  test("GET /api/not-a-route responds with a status 404 and returns an error message", async () => {
    const { body } = await request(app).get("/api/not-a-route").expect(404);
    expect(body.message).toBe("Route not found");
  });
});
