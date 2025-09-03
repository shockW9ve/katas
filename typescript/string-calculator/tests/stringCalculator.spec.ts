import { add } from "../src/stringCalculator";

describe("stringCalculator.add()", () => {
  it("returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  it("negative number throws error", () => {
    expect(() => add("1,-2")).toThrow("negative numbers are not accepted");
  });

  it("single number returns value", () => {
    expect(add("9")).toBe(9);
  });

  it("sums two comma seperated numbers", () => {
    expect(add("2,3")).toBe(5);
  });

  it("sums three comma seperated numbers", () => {
    expect(add("6,3,9")).toBe(18);
  });

  it("number above 1000 is ignored", () => {
    expect(add("1001,3")).toBe(3);
  });

  it("newline acts as a delimiter", () => {
    expect(add("1\n2")).toBe(3);
  });

  it("supports mix of newline and comma", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  it("custom delimiter starts with // then character then newline", () => {
    expect(add("//;\n1;2")).toBe(3);
  });
});
