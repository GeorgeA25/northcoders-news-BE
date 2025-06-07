const { deleteCommentById } = require("../models/comments.model");
const { isValidId } = require("../utils/validators");

const deleteComment = async (request, response, next) => {
  try {
    const { comment_id } = request.params;
    if (!isValidId(comment_id)) {
      return response.status(400).send({ message: "Bad request" });
    }
    const comment = await deleteCommentById(comment_id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteComment };
