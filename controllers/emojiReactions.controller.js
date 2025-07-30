const {
  addEmojiReaction,
  fetchReactionsByArticleId,
  deleteEmojiReaction,
} = require("../models/emojiReactions.model");

const createEmojiReaction = async (request, response, next) => {
  const { emoji_id, username, article_id } = request.body;

  try {
    const newReaction = await addEmojiReaction(emoji_id, username, article_id);
    response.status(201).json({ reaction: newReaction });
  } catch (error) {
    next(error);
  }
};

const getEmojiReactionsByArticleId = async (request, response, next) => {
  const { article_id } = request.params;

  try {
    const reactions = await fetchReactionsByArticleId(article_id);
    response.status(200).json({ reactions });
  } catch (error) {
    next(error);
  }
};

const removeEmojiReaction = async (request, response, next) => {
  const { emoji_id, username, article_id } = request.params;

  try {
    const deleteReaction = await deleteEmojiReaction(
      emoji_id,
      username,
      article_id
    );

    if (deleteReaction) {
      response.status(204).send();
    } else {
      response.status(404).json({ message: "Reaction not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmojiReaction,
  getEmojiReactionsByArticleId,
  removeEmojiReaction,
};
