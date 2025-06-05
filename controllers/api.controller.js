const endpoints = require("../endpoints.json");

const getApiDocs = async (request, response, next) => {
  try {
    response.status(200).send({ endpoints });
  } catch (error) {
    next(error);
  }
};
module.exports = { getApiDocs };
