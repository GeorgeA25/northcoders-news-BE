const db = require("../db/connection");

const addEmojiReaction = async (emoji_id, username, article_id) => {
  const { rows: emojiReaction } = await db.query(
    `INSERT INTO emoji_reactions (emoji_id, username, article_id) VALUES ($1, $2, $3) RETURNING *;`,
    [emoji_id, username, article_id]
  );
  return emojiReaction[0];
};

const fetchReactionsByArticleId = async (article_id) => {
  const { rows: emojiReaction } = await db.query(
    `SELECT * FROM emoji_reactions WHERE article_id = $1;`,
    [article_id]
  );
  return emojiReaction;
};

const deleteEmojiReaction = async (emoji_id, username, article_id) => {
  const { rows: deleteEmojiReaction } = await db.query(
    `DELETE FROM emoji_reactions WHERE emoji_id = $1 AND username = $2 AND article_id = $3 RETURNING *;`,
    [emoji_id, username, article_id]
  );
  return deleteEmojiReaction[0];
};

module.exports = {
  addEmojiReaction,
  fetchReactionsByArticleId,
  deleteEmojiReaction,
};
