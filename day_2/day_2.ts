const text: string = await Deno.readTextFile("input_day_2");
const separated: string[] = text.split(",");


const result: number = separated.reduce((acc: number, curr: string) => {
  const [first, second] = curr.split("-");

  acc += getInvalidIdsInRange(Number(first), Number(second));


  return acc;
}, 0);

function getInvalidIdsInRange(start: number, end: number): number {
  let sum: number = 0;
  for (let i = start; i <= end; i++) {
    if (repeatingCharacters(i)) {
      sum += i;
      console.log(`invalid character ${i}`)
    }
  }

  return sum;
}

function repeatingMiddle(number: number): boolean {
  const s = String(number);
  if (s.length % 2 !== 0) {
    return false;
  }

  const mid = s.length / 2;
  return s.slice(0, mid) === s.slice(mid);
}

function repeatingCharacters(number: number): boolean {
  const s = String(number);

  for (let i = 1; i < s.length; i++) {
    const substr = s.substring(0, i);
    const repeater = s.length / substr.length;

    if (substr.repeat(repeater) === s) {
      return true;
    }
  }

  return false;
}

console.log(result);

