const {
  selectArticles,
  selectArticlesById,
  selectCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleByArticleId,
} = require("../models/articles.model");
const {
  isValidId,
  isValidIncVotes,
  convertCommentsCount,
} = require("../utils/validators");
const getArticles = async (request, response, next) => {
  try {
    const { sort_by, order, topic } = request.query;
    const articles = await selectArticles(sort_by, order, topic);
    const formattedArticles = convertCommentsCount(articles);
    response.status(200).send({ articles: formattedArticles });
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

const updateArticle = async (request, response, next) => {
  try {
    const { article_id } = request.params;
    const { inc_votes } = request.body;
    if (!isValidId(article_id)) {
      return response.status(400).send({ message: "Bad request" });
    }
    if (typeof inc_votes !== "number" || isNaN(inc_votes)) {
      return response.status(400).send({ message: "Bad request" });
    }
    const updatedArticle = await updateArticleByArticleId(
      Number(article_id),
      inc_votes
    );
    response.status(200).send({ article: updatedArticle });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentsByArticleId,
  updateArticle,
};
