const {
  convertTimestampToDate,
  createLookupObj,
} = require("../db/seeds/utils");

describe.skip("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe.skip("createLookupObj", () => {
  test("createLookupObj function returns an empty object when passed an empty array", () => {
    const array = [];
    const key = "title";
    const value = "article_id";
    const outcome = createLookupObj(array, key, value);
    expect(outcome).toEqual({});
  });
  test("createLookupObj function returns an object with correct key and value referenced when passed an array with a single object", () => {
    const array = [{ title: "A", article_id: 1 }];
    const key = "title";
    const value = "article_id";
    const outcome = createLookupObj(array, key, value);
    expect(outcome).toEqual({ A: 1 });
  });
  test("createLookupObj function returns an object with correct key and value refereneced when passed an array with multple objects", () => {
    const array = [
      { title: "A", article_id: 1 },
      { title: "B", article_id: 2 },
    ];
    const key = "title";
    const value = "article_id";
    const outcome = createLookupObj(array, key, value);
    expect(outcome).toEqual({ A: 1, B: 2 });
  });
  test("createLookupObj function does not mutate the original input array", () => {
    const array = [{ title: "A", article_id: 1 }];
    const key = "title";
    const value = "article_id";
    const originalCopy = [{ title: "A", article_id: 1 }];
    expect(array).toEqual(originalCopy);
  });
});
