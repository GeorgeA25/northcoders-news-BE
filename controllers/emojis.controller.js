const { selectEmojis } = require("../models/emojis.model");

const getEmojis = async (request, response, next) => {
  try {
    const emojis = await selectEmojis();
    response.status(200).send({ emojis });
  } catch (error) {
    next(error);
  }
};

module.exports = getEmojis;
