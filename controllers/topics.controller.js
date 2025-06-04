const { selectTopics } = require("../models/topics.model");

const getTopics = async (request, response) => {
  const topics = await selectTopics();
  response.status(200).send({ topics });
};
