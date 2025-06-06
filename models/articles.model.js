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

const selectCommentsByArticleId = async (article_id) => {
  const { rows } = await db.query(
    `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments LEFT JOIN articles On comments.article_id = articles.article_id WHERE comments.article_id = $1 ORDER BY comments.created_at DESC;`,
    [article_id]
  );
  return rows;
};

module.exports = {
  selectArticles,
  selectArticlesById,
  selectCommentsByArticleId,
};
