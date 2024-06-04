import { sum } from "./sum";

describe("sum function", () => {
  it("should add two number", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, 2)).toBe(4);
  });
});
