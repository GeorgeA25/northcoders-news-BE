const db = require("../db/connection");

const selectTopics = async () => {
  const { rows: topics } = await db.query(
    `SELECT slug, description FROM topics;`
  );
  return topics;
};

module.exports = { selectTopics };
