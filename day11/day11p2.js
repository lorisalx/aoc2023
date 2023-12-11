const { parse } = require('path');

const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');


let grid = input1.split('\n').map(x => x.split(''));

// EXPAND GRID
let indexesToAddRow = [];
for (let i = 0; i < grid.length; i++) {
  if (grid[i].every(x => x === '.')) {
    indexesToAddRow.push(i);
  }
}



let indexesToAddColumn = [];
for (let i = 0; i < grid[0].length; i++) {
  if (grid.map(x => x[i]).every(x => x === '.')) {
    indexesToAddColumn.push(i);
  }
}

const displayGrid = (grid) => {
  grid.forEach(x => console.log(x.join('')));
}

displayGrid(grid);


// SOLVE 

let galaxies = [];

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === '#') {
      galaxies.push([i, j]);
    }
  }
}

const shortestPath = ([i, j], [k, l]) => {
  let pathLength = 0;
  if (i > k) {
    [i, k] = [k, i];
  }

  if (j > l) {
    [j, l] = [l, j];
  }

  let row = indexesToAddRow.filter(x => x > i && x < k);
  let column = indexesToAddColumn.filter(x => x > j && x < l);

  xDistance = Math.abs(i - k) + row.length * (1000000 - 1);
  yDistance = Math.abs(j - l) + column.length * (1000000 - 1);

  pathLength = xDistance + yDistance;
  return pathLength;
}

// for a given galaxy (i, j), find the shortest path to all other galaxies
let paths = [];
for (let i = 0; i < galaxies.length; i++) {
  let [x, y] = galaxies[i];
  for (let j = 0; j < galaxies.length; j++) {
    let [k, l] = galaxies[j];
    if (i !== j) {
      let path = shortestPath([x, y], [k, l]);
      paths.push(path);
    }
  }
}

console.log(paths.reduce((a, b) => a + b) / 2);