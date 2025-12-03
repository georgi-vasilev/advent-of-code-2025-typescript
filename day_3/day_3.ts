const input: string = await Deno.readTextFile("input_day_3");
const joltage = input.split("\n").map((line: string) => line.trim());
//const joltage: string[] = ["987654321111111", "811111111111119", "234234234234278", "818181911112111"];


//In 987654321111111, you can make the largest joltage possible, 98, by turning on the first two batteries.
//In 811111111111119, you can make the largest joltage possible by turning on the batteries labeled 8 and 9, producing 89 jolts.
//In 234234234234278, you can make 78 by turning on the last two batteries (marked 7 and 8).
//In 818181911112111, the largest joltage you can produce is 92.
//The total output joltage is the sum of the maximum joltage from each bank, so in this example, the total output joltage is 98 + 89 + 78 + 92 = 357.

let counter = 0;
const result = joltage.reduce((acc: number, curr: string) => {
  const joltage = findBiggestJoltage(curr);
  acc += joltage;

  return acc;
}, 0);

console.log(result);

function findBiggestJoltage(str: string): number {
  let maxPair = -1;
  let bestToTheRight = -1;

  for (let i = str.length - 1; i >= 0; i--) {
    const digit: number = Number(str[i]);

    if (bestToTheRight !== -1) {
      maxPair = Math.max(maxPair, 10 * digit + bestToTheRight);
    }
    bestToTheRight = Math.max(bestToTheRight, digit);
  }


  return maxPair === -1 ? 0 : maxPair;
}
