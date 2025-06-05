const { request } = require("../app");
const {
  selectArticles,
  selectArticlesById,
} = require("../models/articles.model");
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
    console.log(article_id);
    const articlesId = await selectArticlesById(article_id);
    response.status(200).send({ articlesId });
  } catch (error) {
    next(error);
  }
};

module.exports = { getArticles, getArticlesById };
