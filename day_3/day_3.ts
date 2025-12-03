const input: string = await Deno.readTextFile("input_day_3");
const joltage = input.split("\n").map((line: string) => line.trim());
//const joltage: string[] = ["987654321111111", "811111111111119", "234234234234278", "818181911112111"];

const result = joltage.reduce((acc: number, curr: string) => {
  const joltage = findBiggest12DigitJoltage(curr);
  acc += joltage;

  return acc;
}, 0);

console.log(result);

// part 1 function
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

// part 2 funcs
function maxNDigits(str: string, keep: number): string {
  let toRemove: number = str.length - keep;
  const stack: string[] = [];

  for (const ch of str) {
    while (toRemove > 0 && stack.length && stack[stack.length - 1] < ch) {
      stack.pop();
      toRemove--;
    }
    stack.push(ch);
  }

  return stack.slice(0, keep).join('');
}

function findBiggest12DigitJoltage(str: string): number {
  return Number(maxNDigits(str, 12));
}
