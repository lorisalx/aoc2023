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
  else {
    neighbors.push('.');
  }
  if (row - 1 >= 0) {
    neighbors.push(grid[row - 1][col]);
  }
  else {
    neighbors.push('.');
  }
  if (row - 1 >= 0 && col + 1 < grid[0].length) {
    neighbors.push(grid[row - 1][col + 1]);
  }
  else {
    neighbors.push('.');
  }
  if (col - 1 >= 0) {
    neighbors.push(grid[row][col - 1]);
  }
  else {
    neighbors.push('.');
  }
  if (col + 1 < grid[0].length) {
    neighbors.push(grid[row][col + 1]);
  }
  else {
    neighbors.push('.');
  }
  if (row + 1 < grid.length && col - 1 >= 0) {
    neighbors.push(grid[row + 1][col - 1]);
  }
  else {
    neighbors.push('.');
  }
  if (row + 1 < grid.length) {
    neighbors.push(grid[row + 1][col]);
  }
  else {
    neighbors.push('.');
  }
  if (row + 1 < grid.length && col + 1 < grid[0].length) {
    neighbors.push(grid[row + 1][col + 1]);
  }
  else {
    neighbors.push('.');
  }
  return neighbors;
}

let hasFoundNumber = false;
let currentNumber = '';
let neighborsIsStar = false;
let starPositions = [];
let starPosition = '';
const starPositionsMap = new Map();


for (let i = 0; i < grid.length; i++) {
  const row = grid[i];
  for (let j = 0; j < row.length; j++) {
    const cell = row[j];
    if (cell >= '0' && cell <= '9') {
      hasFoundNumber = true;
      currentNumber += cell;
      if (!neighborsIsStar) {
        let neighbors = get8Neighbors(grid, i, j);
        for (let k = 0; k < neighbors.length; k++) {
          if (neighbors[k] === '*') {
            neighborsIsStar = true;
            switch(k) {
              case 0:
                starPosition = (i - 1) + ',' + (j - 1);
                break;
              case 1:
                starPosition = (i - 1) + ',' + j;
                break;
              case 2:
                starPosition = (i - 1) + ',' + (j + 1);
                break;
              case 3:
                starPosition = i + ',' + (j - 1);
                break;
              case 4:
                starPosition = i + ',' + (j + 1);
                break;
              case 5:
                starPosition = (i + 1) + ',' + (j - 1);
                break;
              case 6:
                starPosition = (i + 1) + ',' + j;
                break;
              case 7:              
                starPosition = (i + 1) + ',' + (j + 1);
                break;
              case 8:
                starPosition = i + ',' + j;
                break;
            }
            starPositions.push(starPosition);
          }
        }
      }
    }
    else {
      if (hasFoundNumber && neighborsIsStar) {
        starPositions.forEach(starPosition => {
          if (starPositionsMap.has(starPosition)) {
            starPositionsMap.set(starPosition, [...starPositionsMap.get(starPosition), parseInt(currentNumber)]);
          }
          else {
            starPositionsMap.set(starPosition, [parseInt(currentNumber)]);
          }
        })
      }
      hasFoundNumber = false;
      currentNumber = '';
      neighborsIsStar = false;
      starPositions = [];
      starPosition = '';
    }
  }
}

const starPositionsSet = new Set(starPositionsMap.values());
starPositionsSet.forEach(value => {
  if (value.length === 2) {
    sum += value[0] * value[1];
  }
})

console.log(sum);