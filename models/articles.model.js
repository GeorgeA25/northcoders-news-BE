const db = require("../db/connection");
const {
  isValidSortBy,
  isValidOrder,
  isValidTopics,
} = require("../utils/validators");

const selectArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  if (!isValidSortBy(sort_by)) {
    return Promise.reject({ status: 400, message: "Invalid sort_by query" });
  }
  if (!isValidOrder(order)) {
    return Promise.reject({ status: 400, message: "Invalid order query" });
  }
  if (topic && !isValidTopics(topic)) {
    return Promise.reject({ status: 400, message: "Invalid topic query" });
  }
  const queryValues = [];
  let query = `
        SELECT
        articles.article_id,
        articles.title,
        articles.topic,
        articles.author,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id`;

  if (topic) {
    queryValues.push(topic);
    query += ` WHERE articles.topic = $1`;
  }

  query += ` GROUP BY articles.article_id
        ORDER BY ${
          sort_by === "comment_count" ? "comment_count" : `articles.${sort_by}`
        } ${order};`;
  const { rows: articles } = await db.query(query, queryValues);
  return articles;
};

const selectArticlesById = async (id) => {
  const { rows } = await db.query(
    `SELECT
     articles.article_id,
     articles.title,
     articles.topic,
     articles.author,
     articles.body,
     articles.created_at,
     articles.votes,
     articles.article_img_url,
     COUNT(comments.comment_id) AS comment_count 
     FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id 
     WHERE articles.article_id = $1 
     GROUP BY articles.article_id`,
    [id]
  );
  const article = rows[0];
  if (!article) {
    return Promise.reject({ status: 404, message: "Article not found" });
  } else {
    return article;
  }
};

const selectCommentsByArticleId = async (id) => {
  const { rows } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [id]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, message: "Article not found" });
  }

  const { rows: comments } = await db.query(
    `SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY comments.created_at DESC;`,
    [id]
  );
  return comments;
};

const insertCommentByArticleId = async (id, username, body) => {
  const { rows: articles } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [id]
  );

  if (!articles.length) {
    return Promise.reject({
      status: 404,
      message: "Article not found",
    });
  }

  const { rows: users } = await db.query(
    `SELECT * FROM users WHERE username = $1;`,
    [username]
  );

  if (!users.length) {
    return Promise.reject({
      status: 404,
      message: "User not found",
    });
  }

  const insertQuery = `INSERT INTO comments (author, article_id, body) VALUES ($1, $2, $3) RETURNING *;`;
  const {
    rows: [comment],
  } = await db.query(insertQuery, [username, id, body]);
  return comment;
};

const updateArticleByArticleId = async (id, inc_votes) => {
  const { rows: articles } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [id]
  );
  if (!articles.length) {
    return Promise.reject({ status: 404, message: "Article not found" });
  }

  const {
    rows: [updatedArticle],
  } = await db.query(
    `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
    [inc_votes, id]
  );
  return updatedArticle;
};

module.exports = {
  selectArticles,
  selectArticlesById,
  selectCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleByArticleId,
};
