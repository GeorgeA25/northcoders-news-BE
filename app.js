const express = require("express");
const app = express();
const { getApiDocs } = require("./controllers/api.controller");

app.get("/api", getApiDocs);

module.exports = app;
