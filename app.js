const express = require("express");
const app = express();
const { getApiDocs } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentsByArticleId,
  updateArticle,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const { deleteComment } = require("./controllers/comments.controller");
const {
  handle404,
  handle400,
  customHandlerError,
  handle500,
} = require("./errorHandlers");
const cors = require("cors");
const getEmojis = require("./controllers/emojis.controller");
const {
  getEmojiReactionsByArticleId,
  createEmojiReaction,
  removeEmojiReaction,
} = require("./controllers/emojiReactions.controller");

app.use(cors());

app.use(express.json());

app.get("/api", getApiDocs);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/emojis", getEmojis);

app.get("/api/emoji-reactions/:article_id", getEmojiReactionsByArticleId);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.post("/api/emoji-reactions", createEmojiReaction);

app.patch("/api/articles/:article_id", updateArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.delete(
  "/api/emoji-reactions/:emoji_id/:username/:article_id",
  removeEmojiReaction
);

app.use(handle404);

app.use(handle400);

app.use(customHandlerError);

app.use(handle500);

module.exports = app;
