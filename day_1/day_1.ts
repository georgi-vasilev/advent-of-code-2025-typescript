const text = await Deno.readTextFile("input_day_1");
const inputs: Array<string> = text.split("\n").map((line: string) => line.trim());

let dial: number = 50;
let passes: number = 0;

for (const input of inputs) {
  const rotations = Number(input.substring(1));
  const direction = input.startsWith("L") ? -1 : 1;

  let distToZero: number;
  if (direction === 1) {
    distToZero = dial === 0 ? 100 : (100 - dial);
  } else {
    distToZero = dial === 0 ? 100 : dial;
  }

  // Count how many times we hit 0
  if (rotations >= distToZero) {
    passes += 1 + Math.floor((rotations - distToZero) / 100);
  }

  dial = ((dial + direction * rotations) % 100 + 100) % 100;
}

console.log(passes);
