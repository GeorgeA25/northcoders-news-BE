const db = require("../db/connection");

const selectTopics = async () => {
  const { rows: topics } = await db.query(
    `SELECT slug, descriptions FROM topics;`
  );
  return topics;
};
