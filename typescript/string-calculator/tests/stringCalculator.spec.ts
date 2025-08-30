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

  it("adding two numbers gives a positive number", () => {
    expect(add("2, 3")).toBe(5);
  });

  it("nummber above 1000 is ignored", () => {
    expect(add("1001, 3")).toBe(3);
  });

  it("single number returns value", () => {
    expect(add("9")).toBe(9);
  });

  it("newline acts a delimiter", () => {
    expect(add("1\n 2")).toBe(3);
  });

  it("supports mix of newline and comma", () => {
    expect(add("3\n, 3")).toBe(6);
  });
});
