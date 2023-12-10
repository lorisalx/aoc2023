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

while (currentChar !== 'S') {
  console.log('\n\n');
  console.log(currentChar, currentDirection);

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
    console.log('currentDirection');
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
  index += 1;
}

console.log(index / 2);