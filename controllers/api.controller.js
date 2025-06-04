const endpoints = require("../endpoints.json");

const getApiDocs = async (request, response) => {
  response.status(200).send({ endpoints });
};

module.exports = { getApiDocs };
