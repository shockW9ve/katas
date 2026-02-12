import { describe, it, expect } from "vitest";
import { hello } from "../src/index.js";

describe("smoke", () => {
  it("boots", () => {
    expect(hello()).toBe("Kal Was Flam");
  });
});
