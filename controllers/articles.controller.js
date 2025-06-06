const {
  selectArticles,
  selectArticlesById,
  selectCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/articles.model");
const { isValidId } = require("../utils/validators");
const getArticles = async (request, response, next) => {
  try {
    const articles = await selectArticles();
    response.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};

const getArticlesById = async (request, response, next) => {
  try {
    const { article_id } = request.params;
    if (!isValidId(article_id)) {
      return response.status(400).send({ message: "Bad request" });
    }
    const article = await selectArticlesById(article_id);
    response.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};

const getCommentsByArticleId = async (request, response, next) => {
  try {
    const { article_id } = request.params;
    if (!isValidId(article_id)) {
      return response.status(400).send({ message: "Bad request" });
    }
    const comments = await selectCommentsByArticleId(article_id);
    response.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};

const postCommentsByArticleId = async (request, response, next) => {
  try {
    const { article_id } = request.params;
    const { username, body } = request.body;
    if (!isValidId(article_id)) {
      return response.status(400).send({ message: "Bad request" });
    }
    if (!username || !body) {
      return response.status(400).send({ message: "Missing required fields" });
    }
    const postComment = await insertCommentByArticleId(
      article_id,
      username,
      body
    );
    response.status(201).send({ comment: postComment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentsByArticleId,
};
