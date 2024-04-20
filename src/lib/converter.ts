type RomanNumeralsMap = { [key: string]: number };

// Usage:
// console.log(RomanConverter.toRoman(1903)); // Output: MCMIII
// console.log(RomanConverter.fromRoman("MCMIII")); // Output: 1903
export class RomanConverter {
  private static romanNumerals: RomanNumeralsMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  public static toRoman(num: number): string {
    if (num <= 0) {
      return "";
    }
    return Object.keys(this.romanNumerals).reduce(
      (acc: string, key: string) => {
        while (num >= this.romanNumerals[key]) {
          acc += key;
          num -= this.romanNumerals[key];
        }
        return acc;
      },
      ""
    );
  }

  public static fromRoman(roman: string): number {
    if (roman.trim() === "") {
      return 0;
    }
    return Object.keys(this.romanNumerals).reduce(
      (acc: number, key: string) => {
        while (roman.startsWith(key)) {
          acc += this.romanNumerals[key];
          roman = roman.substring(key.length);
        }
        return acc;
      },
      0
    );
  }
}
