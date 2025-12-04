const text: string = await Deno.readTextFile("input_day_4");
const inputs: Array<Array<string>> = text.split("\n").map((line: string) => line.trim().split(""));

console.log(dfs(inputs));




// part 1 func
function dfs(adjencency: Array<Array<string>>): number {
  const rowLength = adjencency.length;
  const colLength = adjencency[0].length;

  const dirs = [
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
  for (let sr = 0; sr < rowLength; sr++) {

    for (let sc = 0; sc < colLength; sc++) {
      if (adjencency[sr][sc] !== '@' || visited[sr][sc]) {
        continue;
      }

      stack.push([sr, sc]);

      while (stack.length > 0) {
        const [row, col] = stack.pop()!;
        if (visited[row][col]) {
          continue;
        }

        visited[row][col] = true;

        let neighbourCount = 0;
        for (const [dr, dc] of dirs) {
          const nr = row + dr;
          const nc = col + dc;

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



type Stack<T> = Array<[T, T]>;
