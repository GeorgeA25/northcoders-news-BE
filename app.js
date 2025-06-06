const express = require("express");
const app = express();
const { getApiDocs } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentsByArticleId,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const {
  handle404,
  handle400,
  customHandlerError,
  handle500,
} = require("./errorHandlers");

app.use(express.json());

app.get("/api", getApiDocs);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.use(handle404);

app.use(handle400);

app.use(customHandlerError);

app.use(handle500);
module.exports = app;
