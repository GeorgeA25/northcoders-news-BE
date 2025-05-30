const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createLookupObj } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments, articles, users, topics;`)
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
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        topic VARCHAR(50) REFERENCES topics(slug),
        author VARCHAR(50) REFERENCES users(username),
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id),
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        author VARCHAR(50) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
    });
};
module.exports = seed;
