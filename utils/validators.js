function convertCommentsCount(articles) {
  return articles.map((article) => ({
    ...article,
    comment_count: Number(article.comment_count),
  }));
}

function isValidId(id) {
  const number = Number(id);
  return Number.isInteger(number) && number > 0;
}

function isValidIncVotes(value) {
  return typeof value === "number" && (value === 1 || value == -100);
}

const validSortBy = [
  "article_id",
  "title",
  "topic",
  "author",
  "created_at",
  "votes",
  "comment_count",
];
const validOrder = ["asc", "desc"];

function isValidSortBy(value) {
  return validSortBy.includes(value);
}

function isValidOrder(value) {
  return validOrder.includes(value);
}

const validTopics = ["mitch", "cats", "paper"];

function isValidTopics(topic) {
  return validTopics.includes(topic);
}

module.exports = {
  convertCommentsCount,
  isValidId,
  isValidIncVotes,
  isValidSortBy,
  isValidOrder,
  isValidTopics,
};
