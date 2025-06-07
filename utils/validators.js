function isValidId(id) {
  const number = Number(id);
  return Number.isInteger(number) && number > 0;
}

function isValidIncVotes(value) {
  return typeof value === "number" && (value === 1 || value == -100);
}

module.exports = { isValidId, isValidIncVotes };
