const {
  isValidId,
  isValidIncVotes,
  convertCommentCount,
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
    const outcome = convertCommentCount(input);
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
    convertCommentCount(input);
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

describe("isValidIncVotes", () => {
  test("isValidIncVotes function returns true for a postitive interger of 1", () => {
    const input = 1;
    const outcome = isValidIncVotes(input);
    expect(outcome).toBe(true);
  });
  test("isValidIncVotes function returns true for a negative number of -100", () => {
    const input = -100;
    const outcome = isValidIncVotes(input);
    expect(outcome).toBe(true);
  });
  test("isValidIncVotes function returns false when passed 100", () => {
    const input = 100;
    const outcome = isValidIncVotes(input);
    expect(outcome).toBe(false);
  });
  test("isValidIncVotes function returns false when passed 0", () => {
    const input = 0;
    const outcome = isValidIncVotes(input);
    expect(outcome).toBe(false);
  });
  test("isValidIncVotes function returns false when passed a string of '1'", () => {
    const input = "1";
    const outcome = isValidIncVotes(input);
    expect(outcome).toBe(false);
  });
  test("isValidIncVotes function returns false when passed a string of '-100'", () => {
    const input = "-100";
    const outcome = isValidIncVotes(input);
    expect(outcome).toBe(false);
  });
});
