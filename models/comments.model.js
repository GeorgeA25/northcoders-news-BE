const db = require("../db/connection");

const deleteCommentById = async (id) => {
  const { rows } = await db.query(
    `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`,
    [id]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, message: "Comment not found" });
  }
  return rows[0];
};

module.exports = { deleteCommentById };
