const express = require("express");
const app = express();
const { getApiDocs } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");
const { handle404, handle400, handle500 } = require("./errorHandlers");

app.get("/api", getApiDocs);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.use(handle404);

app.use(handle400);

app.use(handle500);
module.exports = app;
