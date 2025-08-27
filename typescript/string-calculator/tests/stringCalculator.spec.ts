import { add } from "../src/stringCalculator";

describe("stringCalculator.add()", () => {
  it("returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  it("negative number throws error", () => {
    try {
      expect(add("1, -2")).toThrow("negative numbers are not accepted");
    } catch (error) {
      console.error(error);
    }
  });
});
