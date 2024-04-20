import { describe, it, expect } from "vitest";
import { RomanConverter } from "./converter";

describe("RomanConverter", () => {
  describe("toRoman", () => {
    it("converts numbers to Roman numerals", () => {
      expect(RomanConverter.toRoman(1)).toBe("I");
      expect(RomanConverter.toRoman(4)).toBe("IV");
      expect(RomanConverter.toRoman(9)).toBe("IX");
      expect(RomanConverter.toRoman(58)).toBe("LVIII");
      expect(RomanConverter.toRoman(1994)).toBe("MCMXCIV");
    });

    it("returns empty string for zero or negative numbers", () => {
      expect(RomanConverter.toRoman(0)).toBe("");
      expect(RomanConverter.toRoman(-1)).toBe("");
    });
  });

  describe("fromRoman", () => {
    it("converts Roman numerals to numbers", () => {
      expect(RomanConverter.fromRoman("I")).toBe(1);
      expect(RomanConverter.fromRoman("IV")).toBe(4);
      expect(RomanConverter.fromRoman("IX")).toBe(9);
      expect(RomanConverter.fromRoman("LVIII")).toBe(58);
      expect(RomanConverter.fromRoman("MCMXCIV")).toBe(1994);
    });

    it("returns 0 for empty or whitespace-only strings", () => {
      expect(RomanConverter.fromRoman("")).toBe(0);
      expect(RomanConverter.fromRoman("    ")).toBe(0);
    });
  });
});
