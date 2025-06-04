const express = require("express");
const app = express();
const { getApiDocs } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");

app.get("/api", getApiDocs);

app.get("/api/topics", getTopics);

module.exports = app;
