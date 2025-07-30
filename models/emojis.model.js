const db = require("../db/connection");

const selectEmojis = async () => {
  const { rows: emojis } = await db.query(`SELECT * FROM emojis`);
  return emojis;
};

module.exports = { selectEmojis };
