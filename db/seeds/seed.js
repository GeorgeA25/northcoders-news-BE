const db = require("../connection");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users,topics;`)
    .then(() => {
      return db.query(`CREATE TABLE topics (
    slug VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    img_url VARCHAR(1000)
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    avatar_url VARCHAR(1000)
    );`);
    });
};
module.exports = seed;
