const db = require("../connection");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`DROP TABLE IF EXISTS topics;
    CREATE TABLE topics (
    slug VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    img_url VARCHAR(1000)
);`);
};
module.exports = seed;
