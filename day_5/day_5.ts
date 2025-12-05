const text: string = await Deno.readTextFile("input_day_5");
const [rangeBlock, numberBlock] = text.trim().split(/\n\s*\n/);

const ranges: Array<Array<number>> = rangeBlock.split("\n").map((line: string) => line.split("-").map(Number));
const numbers: Array<number> = numberBlock.split("\n").map(Number);


const result: Map<number, number> = new Map<number, number>();

// could be optimized by merging the ranges where possible but eh
for (const [start, end] of ranges) {
  for (const num of numbers) {
    if (start <= num && num <= end) {
      if (!result.has(num)) {
        result.set(num, num);
      }
    }
  }
}

console.log([...result.values()].length);
