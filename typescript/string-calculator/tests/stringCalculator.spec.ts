import { add } from "../src/stringCalculator";

describe("stringCalculator.add()", () => {
  it("returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });
});
