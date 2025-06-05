const { selectTopics } = require("../models/topics.model");
const getTopics = async (request, response, next) => {
  try {
    const topics = await selectTopics();
    response.status(200).send({ topics });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTopics };
