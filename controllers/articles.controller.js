const { selectArticles } = require("../models/articles.model");
const getArticles = async (request, response, next) => {
  try {
    const articles = await selectArticles();
    response.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};

module.exports = { getArticles };
