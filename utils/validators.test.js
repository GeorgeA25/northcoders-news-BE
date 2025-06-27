const {
  isValidId,
  isValidIncVotes,
  convertCommentsCount,
  isValidSortBy,
  isValidOrder,
  isValidTopics,
} = require("../utils/validators");

describe("convertCommentCount", () => {
  test("convertCommentCount function converts comment_count from being strings to being numbers", () => {
    const input = [
      {
        article_id: 1,
        comment_count: "1",
      },
    ];
    const expected = [
      {
        article_id: 1,
        comment_count: 1,
      },
    ];
    const outcome = convertCommentsCount(input);
    expect(outcome).toEqual(expected);
  });
  test("convertCommentCount function doesn't mutate the original array of objects", () => {
    const input = [
      {
        article_id: 1,
        comment_count: "1",
      },
    ];
    const inputCopy = JSON.parse(JSON.stringify(input));
    convertCommentsCount(input);
    expect(input).toEqual(inputCopy);
  });
});
describe("isValidId", () => {
  test("isValidId function returns true for a valid postitive interger string", () => {
    const input = "1";
    const outcome = isValidId(input);
    expect(outcome).toBe(true);
  });
  test("isValidId function returns false for a negative number string", () => {
    const input = "-1";
    const outcome = isValidId(input);
    expect(outcome).toBe(false);
  });
  test("isValidId function returns false for a decimal number string", () => {
    const input = "1.1";
    const outcome = isValidId(input);
    expect(outcome).toBe(false);
  });
  test("isValidId function returns false for a non number string", () => {
    const input = "abc";
    const outcome = isValidId(input);
    expect(outcome).toBe(false);
  });
  test("isValidId function returns false when passed 0", () => {
    const input = "0";
    const outcome = isValidId(input);
    expect(outcome).toBe(false);
  });
});

describe("isValidSortBy", () => {
  test("isValidSortBy function returns true when passed 'created_at'", () => {
    const input = "created_at";
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(true);
  });
  test("isValidSortBy function returns true when passed 'votes'", () => {
    const input = "votes";
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(true);
  });
  test("isValidSortBy function returns false when passed an invalid string", () => {
    const input = "invalid_column";
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(false);
  });
  test("isValidSortBy function returns false when passed an empty string", () => {
    const input = "";
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(false);
  });
  test("isValidSortBy function returns false when passed null", () => {
    const input = null;
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(false);
  });
  test("isValidSortBy function returns false when passed undefined", () => {
    const input = undefined;
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(false);
  });
  test("isValidSortBy function returns false when passed a number", () => {
    const input = 1;
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(false);
  });
  test("isValidSortBy function returns false when passed an object", () => {
    const input = { key: "value" };
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(false);
  });
  test("isValidSortBy function returns false when passed an array", () => {
    const input = ["created_at"];
    const outcome = isValidSortBy(input);
    expect(outcome).toBe(false);
  });
});

describe("isValidOrder", () => {
  test("isValidOrder function returns true when passed 'asc'", () => {
    const input = "asc";
    const outcome = isValidOrder(input);
    expect(outcome).toBe(true);
  });
  test("isValidOrder function returns true when passed 'desc'", () => {
    const input = "desc";
    const outcome = isValidOrder(input);
    expect(outcome).toBe(true);
  });
  test("isValidOrder function returns false when passed an invalid string", () => {
    const input = "invalid_column";
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
  test("isValidOrder function returns false when passed 'asc' as uppercase", () => {
    const input = "ASC";
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
  test("isValidOrder function returns false when passed 'desc' as uppercase", () => {
    const input = "DESC";
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
  test("isValidOrder function returns false when passed an empty string", () => {
    const input = "";
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
  test("isValidOrder function returns false when passed null", () => {
    const input = null;
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
  test("isValidOrder function returns false when passed undefined", () => {
    const input = undefined;
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
  test("isValidOrder function returns false when passed a number", () => {
    const input = 1;
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
  test("isValidOrder function returns false when passed an object", () => {
    const input = { order: "asc" };
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
  test("isValidOrder function returns false when passed an array", () => {
    const input = ["asc"];
    const outcome = isValidOrder(input);
    expect(outcome).toBe(false);
  });
});

describe("isValidTopics", () => {
  test("isValidTopics function returns true when passed a valid topic", () => {
    const input = "coding";
    const outcome = isValidTopics(input);
    expect(outcome).toBe(true);
  });
  describe("isValidTopics function returns false when passed an invalid topic", () => {
    const input = "tennis";
    const outcome = isValidTopics(input);
    expect(outcome).toBe(false);
  });
  test("isValidTopics function returns false when passed an empty string", () => {
    const input = "";
    const outcome = isValidTopics(input);
    expect(outcome).toBe(false);
  });
  test("isValidTopics function returns false when pass undefined", () => {
    const input = undefined;
    const outcome = isValidTopics(input);
    expect(outcome).toBe(false);
  });
  test("isValidTopics function returns false when passed null", () => {
    const input = null;
    const outcome = isValidTopics(input);
    expect(outcome).toBe(false);
  });
  test("isValidTopics function returns false when passed a number", () => {
    const input = 1;
    const outcome = isValidTopics(input);
    expect(outcome).toBe(false);
  });
});
