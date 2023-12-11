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

for (let i = 0; i < indexesToAddRow.length; i++) {
  grid.splice(indexesToAddRow[i] + i, 0, Array(grid[0].length).fill('.'));
}

let indexesToAddColumn = [];
for (let i = 0; i < grid[0].length; i++) {
  if (grid.map(x => x[i]).every(x => x === '.')) {
    indexesToAddColumn.push(i);
  }
}

for (let i = 0; i < indexesToAddColumn.length; i++) {
  for (let j = 0; j < grid.length; j++) {
    grid[j].splice(indexesToAddColumn[i] + i, 0, '.');
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
  
  pathLength = Math.abs(i - k) + Math.abs(j - l);

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