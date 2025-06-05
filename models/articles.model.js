const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

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
        COUNT(comments.comment_id)::INT AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
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

module.exports = { selectArticles, selectArticlesById };
