const text: string = await Deno.readTextFile("input_day_4");
const inputs: Array<Array<string>> = text.split("\n").map((line: string) => line.trim().split(""));

console.log(forklift(inputs));




// part 1 func
function dfs(adjencency: Array<Array<string>>): number {
  const rowLength: number = adjencency.length;
  const colLength: number = adjencency[0].length;

  const dirs: Array<Array<number>> = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const visited = Array.from({ length: rowLength }, () => Array(colLength).fill(false));

  let availableScrolls: number = 0;

  const stack: Stack<number> = [];
  for (let sr: number = 0; sr < rowLength; sr++) {

    for (let sc: number = 0; sc < colLength; sc++) {
      if (adjencency[sr][sc] !== '@' || visited[sr][sc]) {
        continue;
      }

      stack.push([sr, sc]);

      while (stack.length > 0) {
        const [row, col]: [number, number] = stack.pop()!;
        if (visited[row][col]) {
          continue;
        }

        visited[row][col] = true;

        let neighbourCount: number = 0;
        for (const [dr, dc] of dirs) {
          const nr: number = row + dr;
          const nc: number = col + dc;

          if (nr < 0 || nc < 0 || nr >= rowLength || nc >= colLength) {
            continue;
          }

          if (adjencency[nr][nc] === '@') {
            neighbourCount++;
            if (!visited[nr][nc]) stack.push([nr, nc]);
          }
        }

        if (neighbourCount < 4) {
          availableScrolls++;
        }
      }
    }
  }

  return availableScrolls;

}

// part 2 function
function findRemovable(adjencency: Array<Array<string>>): Array<Array<number>> {
  const rowLength: number = adjencency.length;
  const colLength: number = adjencency[0].length;

  const dirs: Array<Array<number>> = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const visited = Array.from({ length: rowLength }, () => Array(colLength).fill(false));
  const removable: Array<[number, number]> = [];

  for (let sr: number = 0; sr < rowLength; sr++) {
    for (let sc: number = 0; sc < colLength; sc++) {
      if (adjencency[sr][sc] !== '@' || visited[sr][sc]) continue;

      const stack: Array<[number, number]> = [[sr, sc]];

      while (stack.length > 0) {
        const [r, c] = stack.pop()!;
        if (visited[r][c]) continue;
        visited[r][c] = true;

        let neighbours = 0;

        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;

          if (nr < 0 || nc < 0 || nr >= rowLength || nc >= colLength) {
            continue;
          }

          if (adjencency[nr][nc] === '@') {
            neighbours++;
            if (!visited[nr][nc]) stack.push([nr, nc]);
          }
        }

        // removable rule
        if (neighbours < 4) {
          removable.push([r, c]);
        }
      }
    }
  }

  return removable;
}

function forklift(adjencency: Array<Array<string>>): number {
  let totalRemoved: number = 0;

  while (true) {
    const removable = findRemovable(adjencency);
    if (removable.length === 0) {
      break;
    }
    for (const [row, col] of removable) {
      adjencency[row][col] = '.';
    }

    totalRemoved += removable.length;
  }

  return totalRemoved;

}



type Stack<T> = Array<[T, T]>;
