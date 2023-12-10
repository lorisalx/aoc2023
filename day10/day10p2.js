const { parse } = require('path');

const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');


const grid = input1.split('\n').map(x => x.split(''));


const getAdjacent = (x, y) => {
  let adjacent = [];
  if (x < grid[y].length - 1) {
    adjacent.push(grid[y][x+1]);
  }
  else {
    adjacent.push(null);
  }
  if (y > 0) {
    adjacent.push(grid[y-1][x]);
  }
  else {
    adjacent.push(null);
  }
  if (x > 0) {
    adjacent.push(grid[y][x-1]);
  }
  else {
    adjacent.push(null);
  }
  if (y < grid.length - 1) {
    adjacent.push(grid[y+1][x]);
  }
  else {
    adjacent.push(null);
  }
  return adjacent;
}
let currentChar = 'A';

let startX = 0;
let startY = 0;
for (let i = 0; i < grid.length; i++) {
  if (grid[i].includes('S')) {
    startX = grid[i].indexOf('S');
    startY = i;
  }
}

let currentX = startX;
let currentY = startY;
let currentDirection = 'RIGHT';
let index = 0;
let loop = new Set();
while (currentChar !== 'S') {
  let adjacent = getAdjacent(currentX, currentY);
  if (currentChar === 'A') {
    currentChar = adjacent[0];
    currentX += 1;
  } else if (currentChar === '-') {
    if (currentDirection === 'RIGHT') {
      currentChar = adjacent[0];
      currentX += 1;
    }
    else if (currentDirection === 'LEFT') {
      currentChar = adjacent[2];
      currentX -= 1;
    }
    else {
      throw new Error('Invalid direction');
    }
  } else if (currentChar === '|') {
    if (currentDirection === 'TOP') {
      currentChar = adjacent[1];
      currentY -= 1;
    }
    else if (currentDirection === 'BOTTOM') {
      currentChar = adjacent[3];
      currentY += 1;
    }
    else {
      throw new Error('Invalid direction');
    }
  }
  else if (currentChar === 'L') {
    if (currentDirection === 'LEFT') {
      currentChar = adjacent[1];
      currentY -= 1;
      currentDirection = 'TOP';
    } else if (currentDirection === 'BOTTOM') {
      currentChar = adjacent[0];
      currentX += 1;
      currentDirection = 'RIGHT';
    }
  } else if (currentChar === 'J') {
    if (currentDirection === 'RIGHT') {
      currentChar = adjacent[1];
      currentY -= 1;
      currentDirection = 'TOP';
    } else if (currentDirection === 'BOTTOM') {
      currentChar = adjacent[2];
      currentX -= 1;
      currentDirection = 'LEFT';
    }

  } else if (currentChar === '7') {
    if (currentDirection === 'TOP') {
      currentChar = adjacent[2];
      currentX -= 1;
      currentDirection = 'LEFT';
    } else if (currentDirection === 'RIGHT') {
      currentChar = adjacent[3];
      currentY += 1;
      currentDirection = 'BOTTOM';
    }
  } else if (currentChar === 'F') {
    if (currentDirection === 'TOP') {
      currentChar = adjacent[0];
      currentX += 1;
      currentDirection = 'RIGHT';
    } else if (currentDirection === 'LEFT') {
      currentChar = adjacent[3];
      currentY += 1;
      currentDirection = 'BOTTOM';
    }
  } else {
    throw new Error('Invalid char');
  }
  loop.add([currentX, currentY].toString());

  index += 1;
}

// find all '.' in the grid
const everythingOutsideOfLoop = [];
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (!loop.has([j, i].toString()) && grid[i][j] !== 'S') {
      everythingOutsideOfLoop.push([j, i]);
    }
  }
}

// find S in the grid 
grid[startY][startX] = '-';
const isInLoop = (dot) => {
  let [x, y] = dot;
  let currentX = x;
  let currentY = y;
  let cpt = 0;
  let newIntersectionWithBorder = false;
  let newIntersectionBorderChar = '';
  // check going right
  while (currentX < grid[y].length - 1) {
    currentX += 1;
    if (loop.has([currentX, currentY].toString())) {
      let currentChar = grid[currentY][currentX];
      if ((currentChar === 'L' || currentChar === 'J' || currentChar === '7' || currentChar === 'F') && !newIntersectionWithBorder) {
        newIntersectionWithBorder = true;
        newIntersectionBorderChar = currentChar;
      }
      else if ((currentChar === 'L' || currentChar === 'J' || currentChar === '7' || currentChar === 'F') && newIntersectionWithBorder) {
        newIntersectionWithBorder = false;
        newIntersectionBorderChar += currentChar;
        if (newIntersectionBorderChar === 'L7' || newIntersectionBorderChar === 'FJ') {
          cpt += 1;
        }
        newIntersectionBorderChar = '';
      }
      else if (!newIntersectionWithBorder) {
        cpt += 1;
      }
    }
  }
  if (cpt % 2 === 0) {
    return false;
  }
  currentX = x;
  currentY = y;
  newIntersectionBorderChar = '';

  cpt = 0;
  while (currentX > 0) {
    currentX -= 1;
    if (loop.has([currentX, currentY].toString())) {
      let currentChar = grid[currentY][currentX];
      if ((currentChar === 'L' || currentChar === 'J' || currentChar === '7' || currentChar === 'F') && !newIntersectionWithBorder) {
        newIntersectionWithBorder = true;
        newIntersectionBorderChar = currentChar;
      }
      else if ((currentChar === 'L' || currentChar === 'J' || currentChar === '7' || currentChar === 'F') && newIntersectionWithBorder) {
        newIntersectionWithBorder = false;
        newIntersectionBorderChar = newIntersectionBorderChar + currentChar;
        if (newIntersectionBorderChar === '7L' || newIntersectionBorderChar === 'JF') {
          cpt += 1;
        }
        newIntersectionBorderChar = '';
      }
      else if (!newIntersectionWithBorder) {
        cpt += 1;
      }
    }
  }
  if (cpt % 2 === 0) {
    return false;
  }
  currentX = x;
  currentY = y;
  newIntersectionBorderChar = '';
  cpt = 0;
  while (currentY > 0) {
    currentY -= 1;
    if (loop.has([currentX, currentY].toString())) {
      let currentChar = grid[currentY][currentX];
      if ((currentChar === 'L' || currentChar === 'J' || currentChar === '7' || currentChar === 'F') && !newIntersectionWithBorder) {
        newIntersectionWithBorder = true;
        newIntersectionBorderChar = currentChar;
      }
      else if ((currentChar === 'L' || currentChar === 'J' || currentChar === '7' || currentChar === 'F') && newIntersectionWithBorder) {
        newIntersectionWithBorder = false;
        newIntersectionBorderChar += currentChar;
        if (newIntersectionBorderChar === 'L7' || newIntersectionBorderChar === 'JF') {
          cpt += 1;
        }
        newIntersectionBorderChar = '';      
      }
      else if (!newIntersectionWithBorder) {
        cpt += 1;
      }
    }
  }
  if (cpt % 2 === 0) {
    return false;
  }

  currentX = x;
  currentY = y;
  cpt = 0;
  while (currentY < grid.length - 1) {
    currentY += 1;
    if (loop.has([currentX, currentY].toString())) {
      let currentChar = grid[currentY][currentX];
      if ((currentChar === 'L' || currentChar === 'J' || currentChar === '7' || currentChar === 'F') && !newIntersectionWithBorder) {
        newIntersectionWithBorder = true;
        newIntersectionBorderChar = currentChar;
      }
      else if ((currentChar === 'L' || currentChar === 'J' || currentChar === '7' || currentChar === 'F') && newIntersectionWithBorder) {
        newIntersectionWithBorder = false;
        newIntersectionBorderChar += currentChar;
        if (newIntersectionBorderChar === '7L' || newIntersectionBorderChar === 'FJ') {
          cpt += 1;
        }
        newIntersectionBorderChar = '';      
      }
      else if (!newIntersectionWithBorder) {
        cpt += 1;
      }
    }
  }
  if (cpt % 2 === 0) {
    return false;
  }
  return true;
}


const tilesInLoop = [];
for (let i = 0; i < everythingOutsideOfLoop.length; i++) {
  if (isInLoop(everythingOutsideOfLoop[i])) {
    tilesInLoop.push(everythingOutsideOfLoop[i]);
  }
}

console.log(tilesInLoop.length);

