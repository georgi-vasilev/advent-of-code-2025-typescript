const text = await Deno.readTextFile("input_day_2");
const separated = text.split(",");


const result = separated.reduce((acc, curr) => {
  const [first, second] = curr.split("-");

  acc += getInvalidIdsInRange(Number(first), Number(second));


  return acc;
}, 0);

function getInvalidIdsInRange(start: number, end: number): number {
  let result: number = 0;
  for (let i = start; i <= end; i++) {
    if (repeatingMiddle(i)) {
      result += i;
    }
  }

  return result;
}

function repeatingMiddle(number: number) {
  const s = String(number);
  if (s.length % 2 !== 0) {
    return false;
  }

  const mid = s.length / 2;
  return s.slice(0, mid) === s.slice(mid);
}

console.log(result);

