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

const validTopics = ["coding", "cooking", "football"];

function isValidTopics(topic) {
  return validTopics.includes(topic);
}

module.exports = {
  convertCommentsCount,
  isValidId,
  isValidSortBy,
  isValidOrder,
  isValidTopics,
};
