const express = require("express");
const app = express();
const { getApiDocs } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");

app.get("/api", getApiDocs);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

module.exports = app;
