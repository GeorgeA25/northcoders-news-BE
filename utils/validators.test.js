const { isValidId } = require("../utils/validators");

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
