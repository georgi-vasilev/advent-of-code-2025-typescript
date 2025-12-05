const text: string = await Deno.readTextFile("input_day_5");
const [rangeBlock, numberBlock] = text.trim().split(/\n\s*\n/);

const ranges: Array<[number, number]> = rangeBlock.split("\n").map((line: string) => line.split("-").map(Number));
const numbers: Array<number> = numberBlock.split("\n").map(Number);


// could be optimized by merging the ranges where possible but eh
function findFreshIngredients(set: Set<number>, ranges: Array<[number, number]>): number {
  for (const [start, end] of ranges) {
    for (const num of numbers) {
      if (start <= num && num <= end) {
        if (!set.has(num)) {
          set.add(num);
        }
      }
    }

  }
  return set.size;
}

function mergeRanges(ranges: Array<[number, number]>): Array<[number, number]> {
  ranges.sort((a, b) => a[0] - b[0]);

  const merged: Array<[number, number]> = [];
  let [start, end] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [s, e] = ranges[i];

    if (s <= end) {
      end = Math.max(end, e);
    } else {
      merged.push([start, end]);
      [start, end] = [s, e];
    }
  }

  merged.push([start, end]);
  return merged;
}

function totalCovered(merged: Array<[number, number]>): number {
  let total = 0;
  for (const [start, end] of merged) {
    total += (end - start + 1);
  }
  return total;
}

const mergedRanges: Array<[number, number]> = mergeRanges(ranges);

console.log(totalCovered(mergedRanges));
