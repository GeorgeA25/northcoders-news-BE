const { selectArticles } = require("../models/articles.model");

const getArticles = async (request, response) => {
  const articles = await selectArticles();
  response.status(200).send({ articles });
};

module.exports = { getArticles };
