const text = await Deno.readTextFile("input_day_1");
const inputs: Array<string> = text.split("\n").map((line: string) => line.trim());


let dial: number = 50;
const map = new Map<number, number>();

for (const input of inputs) {
  const rotations = Number(input.substring(1));

  const delta: number = input.startsWith("L") ? -rotations : rotations;

  dial = mod(dial + delta, 100);

  map.set(dial, (map.get(dial) || 0) + 1);
}

let maxKey: number = 0;
let maxValue: number = -Infinity;

for (const [key, value] of map.entries()) {
  if (value > maxValue) {
    maxValue = value;
    maxKey = key;
  }
}

console.log(maxValue);

function mod(number: number, modulo: number): number {
  return ((number % modulo) + modulo) % modulo;
}

