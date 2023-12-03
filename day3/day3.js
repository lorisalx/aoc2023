const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');
let sum = 0;

const grid = input.split('\n').map(x => x.split(''));

function get8Neighbors(grid, row, col) {
  const neighbors = [];
  if (row - 1 >= 0 && col - 1 >= 0) {
    neighbors.push(grid[row - 1][col - 1]);
  }
  if (row - 1 >= 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row - 1 >= 0 && col + 1 < grid[0].length) {
    neighbors.push(grid[row - 1][col + 1]);
  }
  if (col - 1 >= 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col + 1 < grid[0].length) {
    neighbors.push(grid[row][col + 1]);
  }
  if (row + 1 < grid.length && col - 1 >= 0) {
    neighbors.push(grid[row + 1][col - 1]);
  }
  if (row + 1 < grid.length) {
    neighbors.push(grid[row + 1][col]);
  }
  if (row + 1 < grid.length && col + 1 < grid[0].length) {
    neighbors.push(grid[row + 1][col + 1]);
  }
  return neighbors;
}

let hasFoundNumber = false;
let currentNumber = '';
let neighborsIsSymbol = false;
for (let i = 0; i < grid.length; i++) {
  const row = grid[i];
  for (let j = 0; j < row.length; j++) {
    const cell = row[j];
    if (cell >= '0' && cell <= '9') {
      hasFoundNumber = true;
      currentNumber += cell;
      if (!neighborsIsSymbol) {
        let neighbors = get8Neighbors(grid, i, j);
        neighbors.forEach(neighbor => {
          if (neighbor !== '.' && !(neighbor >= '0' && neighbor <= '9')) {
            neighborsIsSymbol = true;
          }
        })
      }
    }
    else {
      if (hasFoundNumber && neighborsIsSymbol) {
        sum += parseInt(currentNumber);
      }
      hasFoundNumber = false;
      currentNumber = '';
      neighborsIsSymbol = false;
    }
  }
}

console.log(sum);