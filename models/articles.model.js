const db = require("../db/connection");

const selectArticles = async () => {
  const { rows: articles } = await db.query(`
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
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id, articles.title,
        articles.topic,
        articles.author,
        articles.created_at,
        articles.votes,
        articles.article_img_url 
        ORDER BY articles.created_at DESC;`);
  return articles;
};

const selectArticlesById = async (id) => {
  const { rows } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [id]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, message: "Article not found" });
  } else {
    return rows[0];
  }
};

const selectCommentsByArticleId = async (id) => {
  const { rows } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [id]
  );
  if (rows.length === 0) {
    return Promise.reject({ status: 404, message: "Article not found" });
  }

  const { rows: comments } = await db.query(
    `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments WHERE comments.article_id = $1 ORDER BY comments.created_at DESC;`,
    [id]
  );
  return comments;
};

const insertCommentByArticleId = async (id, username, body) => {
  const { rows: articles } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [id]
  );

  if (articles.length === 0) {
    return Promise.reject({
      status: 404,
      message: "Article not found",
    });
  }

  const { rows: users } = await db.query(
    `SELECT * FROM users WHERE username = $1;`,
    [username]
  );

  if (users.length === 0) {
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
    `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;`,
    [id, inc_votes]
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
